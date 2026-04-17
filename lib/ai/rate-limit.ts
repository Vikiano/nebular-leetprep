// Rate limiting via Upstash Redis. Falls back to in-memory map if env is not set.

type Limits = {
  free: number;
  pro: number;
  elite: number;
};

const DEFAULT_LIMITS: Limits = { free: 5, pro: 100, elite: 500 };

const inMemory: Map<string, { count: number; date: string }> = new Map();

export async function checkRateLimit(opts: {
  userId: string | null;
  tier: "free" | "pro" | "elite";
}): Promise<{ ok: boolean; limit: number; remaining: number }> {
  const key = opts.userId ?? "anon";
  const limit = DEFAULT_LIMITS[opts.tier];
  const today = new Date().toISOString().slice(0, 10);
  const mapKey = `ai:user:${key}:date:${today}`;

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    try {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({ url: redisUrl, token: redisToken });
      const current = (await redis.get<number>(mapKey)) ?? 0;
      if (current >= limit) {
        return { ok: false, limit, remaining: 0 };
      }
      const next = await redis.incr(mapKey);
      if (next === 1) {
        await redis.expire(mapKey, 60 * 60 * 26);
      }
      return { ok: true, limit, remaining: Math.max(0, limit - next) };
    } catch {
      // fall through to in-memory
    }
  }

  const entry = inMemory.get(mapKey) ?? { count: 0, date: today };
  if (entry.date !== today) {
    entry.count = 0;
    entry.date = today;
  }
  if (entry.count >= limit) {
    return { ok: false, limit, remaining: 0 };
  }
  entry.count += 1;
  inMemory.set(mapKey, entry);
  return { ok: true, limit, remaining: Math.max(0, limit - entry.count) };
}
