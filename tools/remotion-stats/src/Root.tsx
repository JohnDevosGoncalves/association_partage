import "./index.css";
import { Composition } from "remotion";
import { HeroStatsComposition } from "./Composition";

/**
 * Registry des compositions Remotion pour Association Partage.
 *
 * Chaque <Composition /> est rendue séparément. Pour ajouter une nouvelle
 * vidéo (logo sting, OG animée, story Instagram), créer un nouveau fichier
 * .tsx et l'ajouter ici comme entrée.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroStats"
        component={HeroStatsComposition}
        durationInFrames={240} // 8s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
