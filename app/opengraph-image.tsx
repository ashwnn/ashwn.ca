import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "#3f3f46",
          }}
        />

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Domain chip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#71717a",
              fontSize: "14px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#52525b",
              }}
            />
            ashwn.ca
          </div>

          {/* Name */}
          <div
            style={{
              color: "#f4f4f5",
              fontSize: "72px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {siteConfig.name}
          </div>

          {/* Description */}
          <div
            style={{
              color: "#a1a1aa",
              fontSize: "22px",
              lineHeight: 1.55,
              maxWidth: "820px",
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        {/* Bottom row - role tags */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Infrastructure", "Security Operations", "Software Engineering"].map((tag) => (
            <div
              key={tag}
              style={{
                border: "1px solid #27272a",
                padding: "6px 14px",
                color: "#71717a",
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "#3f3f46",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
