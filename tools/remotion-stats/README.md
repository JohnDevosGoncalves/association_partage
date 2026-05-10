# Remotion Stats — Atelier vidéo Association Partage

Ce sous-projet **Remotion** sert à générer des vidéos programmatiques (MP4 / WebM)
qu'on intègre ensuite dans le site principal via `<video>`.

Architecture volontairement séparée du site Next.js : Remotion embarque ~50 MB
de dépendances (Chromium pour le rendering), pas question de plomber le bundle
prod du site vitrine.

## Compositions disponibles

| ID | Durée | Format | Description |
|---|---|---|---|
| `HeroStats` | 8 s · 30 fps | 1920×1080 | Animation des chiffres-clés (2015 · 300 j · 130 m² · 2 700 km) + signature "Entre Terre et Loire" |

## Workflow

### 1. Première installation (une seule fois)

```bash
cd tools/remotion-stats
npm install
```

Installe Remotion 4.x + dépendances (~50 MB).

### 2. Mode preview interactif

```bash
npm run dev
```

Ouvre **Remotion Studio** sur `http://localhost:3000` — interface temps réel
avec timeline, scrubber, props éditables. Chaque modif du code recharge
instantanément la prévisualisation.

### 3. Rendu MP4 final

```bash
npx remotion render HeroStats out/hero-stats.mp4
```

Génère le fichier vidéo dans `out/`. Le rendu utilise Chromium headless,
compte ~30-60 secondes pour 8 s de vidéo en 1080p sur un Mac récent.

**Options utiles** :

```bash
# WebM (plus léger, supporté tous navigateurs modernes)
npx remotion render HeroStats out/hero-stats.webm --codec=vp9

# Qualité maximale (plus lourd)
npx remotion render HeroStats out/hero-stats.mp4 --crf=18
```

### 4. Intégration dans le site

```bash
# Copier le MP4 vers le projet Next.js
mkdir -p ../../public/videos
cp out/hero-stats.mp4 ../../public/videos/hero-stats.mp4
```

Puis dans un composant React du site :

```tsx
<video
  src="/videos/hero-stats.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-cover"
  aria-hidden="true"
/>
```

## Ajouter une nouvelle composition

1. Créer un fichier `src/MyNewComposition.tsx` avec un export d'un composant
   React qui utilise `useCurrentFrame`, `interpolate`, `spring`, `<Sequence>`.
2. L'enregistrer dans `src/Root.tsx` via `<Composition id="..." component={...} />`.
3. Render : `npx remotion render MyNewComp out/my-new-comp.mp4`

## Idées de prochaines compositions

- **LogoSting** (3 s) : identité visuelle qui se forme
- **OgVideo** (4 s en boucle) : remplace l'image Open Graph statique pour partages Twitter/X
- **HeroBackground** (12 s en boucle silencieuse) : voyage Loire → Atlas
- **InstagramStory** (15 s, format 1080×1920)
- **TimelinePivot** (20 s) : la frise 2015 → aujourd'hui en mode cinéma

## Identité visuelle

La composition partage les tokens du site :

- **Police titre** : Cormorant Garamond (300 light, italic)
- **Police corps** : Geist (400 regular, 500 medium)
- **Palette froide (Loire)** : `#1b3a5b` deep · `#7a9cb8` mist · `#f1ecdf` pale
- **Palette chaude (Atlas)** : `#e8a33d` saffron · `#c8553d` terracotta · `#8b3a2a` clay
- **Easing** : approximation cubic-bezier(0.32, 0.72, 0, 1)
- **Spring physics** : `damping: 22, stiffness: 110, mass: 0.6`

## Performance

- ~5-10 s de rendu par seconde de vidéo en 1080p (Mac M-series)
- Pour des rendus longs en CI, voir `@remotion/lambda` (rendu cloud parallélisé)
