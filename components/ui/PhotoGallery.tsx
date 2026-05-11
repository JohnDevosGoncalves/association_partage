"use client";

import { useState, type ReactNode } from "react";
import { Lightbox, type LightboxPhoto } from "./Lightbox";

type PhotoGalleryProps = {
  photos: LightboxPhoto[];
  children: (open: (index: number) => void) => ReactNode;
};

/**
 * Wrapper "render-prop" : déclare une galerie de photos et expose une
 * fonction `open(index)` aux enfants pour déclencher la visionneuse
 * sur n'importe quelle photo.
 *
 * Usage :
 * ```
 * <PhotoGallery photos={[{src, alt}, ...]}>
 *   {(open) => (
 *     <>
 *       <button onClick={() => open(0)}>...</button>
 *       <button onClick={() => open(1)}>...</button>
 *     </>
 *   )}
 * </PhotoGallery>
 * ```
 */
export function PhotoGallery({ photos, children }: PhotoGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      {children((i) => setIndex(i))}
      <Lightbox photos={photos} index={index} onChange={setIndex} />
    </>
  );
}
