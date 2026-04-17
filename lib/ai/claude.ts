import Anthropic from "@anthropic-ai/sdk";

// Claude Opus 4.7 per docs.anthropic.com fetched 2026-04-17
export const CLAUDE_OPUS = "claude-opus-4-7" as const;
export const CLAUDE_SONNET = "claude-sonnet-4-6" as const;
export const CLAUDE_HAIKU = "claude-haiku-4-5" as const;

export function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");
  return new Anthropic({ apiKey });
}

type ExplainLevel = "eli5" | "intermediate" | "expert";

const SYSTEM_PROMPT_BASE = `You are LeetPrep Studio's AI tutor. You help candidates prepare for technical interviews through self-directed practice.

STRICT RULES:
- You are for preparation only. If the user indicates they are currently in a live interview or assessment, refuse and redirect them to contact their hiring coordinator.
- Never produce content that helps a user deceive an employer in real time.
- Stay focused on algorithmic reasoning and concept building.
- Use the style: obsidian-night aesthetic, terse but complete, examples concrete, no emojis, no em dashes.`;

export function explanationSystem(level: ExplainLevel): string {
  const levelGuide = {
    eli5:
      "Explain like the learner has never seen this kind of problem before. Use a real-world analogy first. Then the core idea in plain language. Then a concrete walkthrough.",
    intermediate:
      "Explain for a learner who understands basics but needs the pattern crystallized. Name the pattern. Give the key insight. Walk through the algorithm. Note 1-2 common mistakes.",
    expert:
      "Explain for a strong learner. Lead with time and space complexity. Discuss 2-3 alternate solutions and tradeoffs. Highlight the specific insight that makes the optimal solution click. Tie to related problems.",
  }[level];
  return `${SYSTEM_PROMPT_BASE}\n\nCURRENT MODE: ${level.toUpperCase()}\n${levelGuide}`;
}

export async function explainProblem(opts: {
  problemTitle: string;
  problemPrompt: string;
  level: ExplainLevel;
}): Promise<{ text: string; inputTokens: number; outputTokens: number; model: string }> {
  const client = getAnthropicClient();
  const system = explanationSystem(opts.level);
  const message = await client.messages.create({
    model: CLAUDE_OPUS,
    max_tokens: 2048,
    system,
    messages: [
      {
        role: "user",
        content: `Explain the problem "${opts.problemTitle}" at the ${opts.level.toUpperCase()} level.\n\nProblem:\n${opts.problemPrompt}\n\nFormat the response in markdown. Start with the pattern name if applicable.`,
      },
    ],
  });

  const text = message.content
    .filter((b) => b.type === "text")
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("\n\n");

  return {
    text,
    inputTokens: message.usage.input_tokens,
    outputTokens: message.usage.output_tokens,
    model: message.model,
  };
}
