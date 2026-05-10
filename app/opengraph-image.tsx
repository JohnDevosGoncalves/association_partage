import { ImageResponse } from "next/og";

export const alt = "Association Partage — Entre Terre et Loire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Image de partage social — générée à la compilation, servie en PNG.
 * Reproduit l'identité "Entre Terre et Loire" : moitié bleue Loire,
 * moitié orange Atlas, titre serif italique.
 *
 * Limites de Satori (next/og) : pas de framer-motion, classes CSS limitées,
 * SVG inline OK.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Fond split — Loire à gauche, Atlas à droite */}
        <div style={{ display: "flex", flex: 1, width: "100%" }}>
          <div
            style={{
              flex: 1,
              background:
                "linear-gradient(180deg, #1b3a5b 0%, #2d5a82 60%, #7a9cb8 100%)",
              display: "flex",
            }}
          />
          <div
            style={{
              flex: 1,
              background:
                "linear-gradient(180deg, #e8a33d 0%, #c8553d 60%, #8b3a2a 100%)",
              display: "flex",
            }}
          />
        </div>

        {/* Bande "morphing" centrale (520px = (1200/2) - 80) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 520,
            width: 160,
            background:
              "linear-gradient(180deg, rgba(241,236,223,0.0) 0%, rgba(244,228,193,0.55) 50%, rgba(232,163,61,0.0) 100%)",
            filter: "blur(28px)",
            display: "flex",
          }}
        />

        {/* Vignette sombre pour ancrer le texte */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)",
            display: "flex",
          }}
        />

        {/* Bloc texte centré */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#f1ecdf",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 8,
              textTransform: "uppercase",
              opacity: 0.9,
              marginBottom: 28,
              display: "flex",
            }}
          >
            Association Partage  ·  Depuis 2015
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 300,
              lineHeight: 1,
              fontStyle: "italic",
              display: "flex",
              flexDirection: "column",
              textShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            <span>Entre Terre</span>
            <span>et Loire</span>
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 26,
              fontStyle: "normal",
              opacity: 0.92,
              fontFamily: "sans-serif",
              display: "flex",
            }}
          >
            Un pont solidaire d'Orléans au Haut-Atlas
          </div>
        </div>

        {/* Petits ornements en bas */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 24,
            color: "#f4e4c1",
            fontSize: 18,
            letterSpacing: 4,
            fontFamily: "sans-serif",
          }}
        >
          <span>ORLÉANS</span>
          <span style={{ opacity: 0.6 }}>·</span>
          <span>HAUT-ATLAS</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
