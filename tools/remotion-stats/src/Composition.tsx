import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";

/**
 * Composition principale "Hero Stats" — 8s @ 30fps, 1080p
 *
 * Frames :
 *  0–30   (1s) : intro "Depuis 2015"
 *  30–90  (2s) : "300" jours de soleil — counter animation
 *  90–150 (2s) : "130 m²" PMR Haut-Atlas
 *  150–210(2s) : "2 700 km" pont solidaire
 *  210–240(1s) : signature "Entre Terre et Loire"
 *
 * Easing : Bezier (0.32, 0.72, 0, 1) — quintet aligné sur le site.
 */

export const HeroStatsComposition = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, #f1ecdf 0%, #f8f4ed 45%, #ede4cf 100%)",
      }}
    >
      {/* Halos atmosphériques permanents */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 18% 12%, rgba(122,156,184,0.22), transparent 45%), radial-gradient(circle at 82% 88%, rgba(232,163,61,0.22), transparent 50%)",
        }}
      />

      {/* Grain subtil */}
      <Grain />

      {/* Logo / brand mark en haut */}
      <BrandMark />

      {/* Séquences */}
      <Sequence from={0} durationInFrames={30 + 60}>
        <Intro />
      </Sequence>

      <Sequence from={30} durationInFrames={60}>
        <StatBig
          value={300}
          unit=""
          label="jours de soleil par an"
          accent="atlas"
        />
      </Sequence>

      <Sequence from={90} durationInFrames={60}>
        <StatBig
          value="130"
          unit="m²"
          label="centre PMR au Haut-Atlas"
          accent="atlas"
        />
      </Sequence>

      <Sequence from={150} durationInFrames={60}>
        <StatBig
          value="2 700"
          unit="km"
          label="le pont solidaire"
          accent="loire"
        />
      </Sequence>

      <Sequence from={210} durationInFrames={30}>
        <Outro />
      </Sequence>

      {/* Ligne progress en bas */}
      <ProgressBar />
    </AbsoluteFill>
  );
};

// ============================================================
//  COMPOSANTS DE COMPOSITION
// ============================================================

const easing = (t: number) => {
  // Approximation cubic-bezier(0.32, 0.72, 0, 1)
  return 1 - Math.pow(1 - t, 3.2);
};

const BrandMark: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20, 220, 240], [0, 0.85, 0.85, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        left: 80,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#e8a33d",
        }}
      />
      <div
        style={{
          fontFamily: "Geist",
          fontSize: 18,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#1a1a2e",
          fontWeight: 500,
        }}
      >
        Association Partage
      </div>
    </div>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 18, 22, 30], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const blur = interpolate(frame, [0, 14], [12, 0], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 18], [40, 0], {
    extrapolateRight: "clamp",
    easing,
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          opacity,
          filter: `blur(${blur}px)`,
          transform: `translateY(${y}px)`,
          fontFamily: "Geist",
          fontSize: 28,
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "rgba(26,26,46,0.6)",
          fontWeight: 500,
          marginBottom: 32,
        }}
      >
        Depuis
      </div>
      <div
        style={{
          opacity,
          filter: `blur(${blur}px)`,
          transform: `translateY(${y}px)`,
          fontFamily: "Cormorant Garamond",
          fontSize: 280,
          fontWeight: 300,
          color: "#1a1a2e",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        2015
      </div>
    </AbsoluteFill>
  );
};

type Accent = "loire" | "atlas";

const ACCENTS: Record<Accent, { primary: string; faint: string }> = {
  loire: { primary: "#1b3a5b", faint: "rgba(27,58,91,0.12)" },
  atlas: { primary: "#8b3a2a", faint: "rgba(139,58,42,0.12)" },
};

type StatBigProps = {
  value: number | string;
  unit: string;
  label: string;
  accent: Accent;
};

const StatBig: React.FC<StatBigProps> = ({ value, unit, label, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring entrée
  const enter = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 110, mass: 0.6 },
  });

  // Sortie : fade out à partir de frame 50 sur 60
  const exitOpacity = interpolate(frame, [50, 60], [1, 0], {
    extrapolateRight: "clamp",
  });
  const exitY = interpolate(frame, [50, 60], [0, -30], {
    extrapolateRight: "clamp",
  });

  const blur = interpolate(enter, [0, 1], [10, 0], {
    extrapolateLeft: "clamp",
  });
  const opacity = enter * exitOpacity;
  const y = (1 - enter) * 60 + exitY;

  // Si valeur numérique : compteur progressif
  let displayedValue: string;
  if (typeof value === "number") {
    const counterT = interpolate(frame, [0, 35], [0, 1], {
      extrapolateRight: "clamp",
      easing,
    });
    displayedValue = Math.round(value * counterT).toString();
  } else {
    displayedValue = value;
  }

  const colors = ACCENTS[accent];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity,
      }}
    >
      {/* Filet décoratif horizontal */}
      <div
        style={{
          width: interpolate(enter, [0, 1], [0, 220], {
            extrapolateLeft: "clamp",
          }),
          height: 1,
          background: colors.primary,
          marginBottom: 60,
          opacity: 0.5,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 20,
          filter: `blur(${blur}px)`,
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: 360,
            fontWeight: 300,
            color: colors.primary,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayedValue}
        </div>
        {unit && (
          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: 100,
              fontWeight: 300,
              color: colors.primary,
              letterSpacing: "-0.02em",
              opacity: 0.7,
            }}
          >
            {unit}
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 60,
          fontFamily: "Geist",
          fontSize: 30,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(26,26,46,0.55)",
          fontWeight: 400,
          filter: `blur(${blur}px)`,
          transform: `translateY(${y * 0.7}px)`,
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 24, stiffness: 100, mass: 0.7 },
  });
  const blur = interpolate(enter, [0, 1], [14, 0], {
    extrapolateLeft: "clamp",
  });
  const y = (1 - enter) * 50;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: enter,
        filter: `blur(${blur}px)`,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontFamily: "Cormorant Garamond",
          fontSize: 180,
          fontWeight: 300,
          color: "#1a1a2e",
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
          textAlign: "center",
        }}
      >
        Entre <em style={{ fontStyle: "italic", color: "#8b3a2a" }}>Terre</em>
        <br />
        et <em style={{ fontStyle: "italic", color: "#1b3a5b" }}>Loire</em>
      </div>
      <div
        style={{
          marginTop: 40,
          fontFamily: "Geist",
          fontSize: 22,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(26,26,46,0.5)",
          fontWeight: 400,
        }}
      >
        association-partage.fr
      </div>
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 64,
        left: 80,
        right: 80,
        height: 1,
        background: "rgba(26,26,46,0.08)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, #1b3a5b 0%, #b5824a 60%, #e8a33d 100%)",
          transition: "none",
        }}
      />
    </div>
  );
};

const Grain: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        opacity: 0.04,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>")`,
      }}
    />
  );
};
