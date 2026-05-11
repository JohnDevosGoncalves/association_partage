# Photos des partenaires du Kiosque Solidaire

Voici les fichiers à déposer dans chaque sous-dossier. Les noms doivent être **exactement** ceux indiqués (le code y fait référence).

## christophe-hay/

| Fichier | Photo |
|---|---|
| `portrait.jpg` | Portrait studio (veste blanche col mao, bras croisés sur table, fond bleu pâle bokeh) |
| `action.jpg` | Plan rapproché en cuisine (chef qui dresse avec une pince en métal) |
| `plat-signature.jpg` | Médaillon de viande snacké + truffe noire + bok choy (assiette éclat doré) |
| `dessert.jpg` | Composition rhubarbe + sorbet + pichet céramique (fond blanc) |
| `etablissement.jpg` | Vue aérienne du bâtiment en pierre style XVIIe avec dôme |

## sebastien-papion/

| Fichier | Photo |
|---|---|
| `portrait.jpg` | Portrait vertical avec l'écureuil sur l'épaule (fond noir studio, gros plan) |
| `portrait-large.jpg` | Variante horizontale du portrait (fond noir, plus large) |
| `produit-papienella.jpg` | Pot Papienella noisette (fond gris clair + logo SP rouille) |
| `interaction.jpg` | Sébastien interagit avec l'écureuil + pots de chocolat (fond noir, ambiance) |

## martin-pouret/

| Fichier | Photo |
|---|---|
| `portrait-fondateurs.jpg` | Les deux dirigeants devant la cave de fûts (costumes sombres) |
| `produit-moutarde.jpg` | Pot Moutarde d'Orléans 1797 sur ardoise + grains de poivre |

## duralex/

| Fichier | Photo |
|---|---|
| `verres-picardie.jpg` | Composition des 8 verres Picardie colorés sur table terracotta |

---

## Format recommandé

- **JPEG** ou **WebP**, qualité 80-85
- Résolution **1920×1080 minimum** (next/image redimensionne automatiquement pour chaque viewport)
- Profil **sRGB**
- Optimisez via [TinyPNG](https://tinypng.com) ou [Squoosh](https://squoosh.app) avant de pousser

## Une fois les photos déposées

```bash
cd ~/Documents/Projets/association-partage
git add public/images/partners/
git commit -m "feat: photos partenaires Kiosque (Hay, Papion, Pouret, Duralex)"
git push origin main
```

Vercel redéploiera automatiquement et les photos apparaîtront sur https://association-partage.vercel.app/kiosque
