# Logo Association Partage

## Action requise

Déposez votre logo **PNG** (celui que vous m'avez montré dans la conversation) ici sous le nom **`logo.png`** :

```
public/images/brand/logo.png
```

**Format recommandé** : PNG transparent (fond blanc retiré), 1024×1024 px minimum, profil sRGB.

Une fois le fichier déposé, le composant `<BrandLogo />` (utilisé dans le Hero et la Navbar) l'affichera automatiquement à la place du placeholder SVG actuel.

## Si vous voulez aussi une version SVG

Pour une netteté infinie à toutes les tailles, exportez aussi `logo.svg` à côté du PNG. Le composant utilisera le SVG en priorité s'il est présent.

## Variantes utiles à fournir plus tard

- `logo-white.png` — version inversée pour fonds sombres (mode nuit)
- `logo-mark-only.png` — uniquement le P stylisé sans le texte "Association Partage" (utile pour favicons / petites tailles)
- `favicon.ico` — généré depuis le mark seul
