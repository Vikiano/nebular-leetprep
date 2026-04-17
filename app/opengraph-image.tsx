import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "LeetPrep Studio -- Interview prep platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #0b0f1a 0%, #05070d 100%)",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#22d3ee",
            }}
          />
          <div
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              fontWeight: 500,
            }}
          >
            LeetPrep Studio
          </div>
        </div>
        <div
          style={{
            fontSize: "80px",
            color: "#f1f5f9",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "32px",
          }}
        >
          Interview prep
        </div>
        <div
          style={{
            fontSize: "80px",
            color: "#22d3ee",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "48px",
          }}
        >
          that teaches you.
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          Three-tier AI explanations. Company-specific playbooks. Coding, behavioral, system design.
        </div>
        <div
          style={{
            marginTop: "48px",
            fontSize: "20px",
            color: "#64748b",
          }}
        >
          Operated by Nebular Labs
        </div>
      </div>
    ),
    { ...size }
  );
}
