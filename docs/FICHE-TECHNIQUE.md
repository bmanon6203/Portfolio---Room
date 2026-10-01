# Fiche technique — Portfolio de Manon

Guide pas à pas pour modifier ton site sans être développeuse.

## 0. À savoir avant tout

**Où se trouve quoi ?**

| Je veux modifier… | Fichier |
|---|---|
| Textes, décor, objets de l'accueil, profil, compétences, réseaux, CV, catégories | `src/data/site.js` |
| Mes projets | `src/data/projects.js` |
| Mes images et vidéos de projets | `public/projects/<nom-du-projet>/` |
| Décor, icônes, CV | `public/` (`background.jpg`, `background.mp4`, `icons/`, `cv-manon.pdf`) |
| Couleurs, tailles, animations | `src/styles.css` |
| Curseur | `src/components/Cursor.jsx` + `src/styles.css` |
| Structure du popup | `src/components/Modal.jsx` |

**Comment modifier et publier ?**
- *Méthode simple (sans rien installer)* : sur GitHub, ouvre le fichier, clique sur le crayon ✏️, modifie, puis « Commit changes ». Pour les images : « Add file → Upload files » dans le bon dossier.
- *Méthode locale* : `npm install` (une fois), `npm run dev` pour prévisualiser sur ton ordinateur, puis `git add . && git commit -m "maj" && git push`.
- Dans les deux cas, **Netlify republie automatiquement en 1 à 2 minutes**. Si tu ne vois pas le changement, fais un rechargement forcé (Ctrl/Cmd + Maj + R).

**Règles d'or pour ne rien casser**
- Dans les fichiers `.js`, garde les guillemets `'...'`, les virgules entre les éléments et les accolades `{ }`.
- Les noms de fichiers sont sensibles aux majuscules : `Image.JPG` n'est pas `image.jpg`. Évite espaces et accents dans les noms de fichiers.
- Si le site affiche une page blanche après une modification, annule ton dernier commit : c'est presque toujours une virgule ou un guillemet oublié.

---

## 1. Modifier l'arrière-plan (photo ou vidéo)

Réglage dans `src/data/site.js`, bloc `background` :

```js
background: { type: 'image', src: '/background.jpg', poster: '/background.jpg' },
```

**Option A — une image**
1. Prépare une image 1920×1080 (ou plus), en JPG ou WebP, idéalement sous 500 Ko.
2. Nomme-la `background.jpg` et dépose-la dans `public/` (elle remplace l'ancienne).
3. Garde `type: 'image'`.

**Option B — une vidéo**
1. Dépose `background.mp4` dans `public/`, et une image `background.jpg` (image affichée avant le chargement de la vidéo, et pour les personnes qui désactivent les animations).
2. Mets `type: 'video'` :
```js
background: { type: 'video', src: '/background.mp4', poster: '/background.jpg' },
```
3. La vidéo se lance seule, en boucle, sans son, en plein écran.

**Compresser une vidéo** (ffmpeg, gratuit) :
```
ffmpeg -i ma-video.mov -an -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart background.mp4
```
Vise 10 à 20 secondes, moins de 8 Mo. Plus c'est léger, plus le site est fluide sur mobile.

**Autre nom de fichier ?** Change simplement `src` (ex. `'/ma-piece.mp4'`).
Si aucun fichier n'existe, le site affiche un dégradé vert de secours.

---

## 2. Ajouter un projet

1. **Crée un dossier** `public/projects/mon-projet/` (minuscules, sans espaces, ex. `court-metrage`).
2. **Dépose-y tes médias** : `thumbnail.jpg` (miniature de la bulle, carrée, ~600 px), `cover.jpg` (grande image du popup, 16:9, ~1400 px), `image-01.jpg`, `image-02.jpg`…, `video.mp4`.
3. **Ouvre `src/data/projects.js`**, copie un bloc existant (de `{` jusqu'à `}`), ajoute une virgule après le bloc précédent, colle et modifie :

```js
{
  id: 'court-metrage',          // = nom du dossier, unique
  title: 'Mon court métrage',
  category: 'Animation',        // doit correspondre EXACTEMENT à une catégorie (voir §7)
  year: '2026',
  thumbnail: `${dir('court-metrage')}/thumbnail.jpg`,
  cover: `${dir('court-metrage')}/cover.jpg`,
  description: 'Courte phrase.',
  details: 'Texte complet : intention, démarche, résultat.',
  role: ['Direction artistique', 'Animation'],
  software: ['Blender', 'After Effects'],
  client: 'École / client / contexte',
  images: [`${dir('court-metrage')}/image-01.jpg`, `${dir('court-metrage')}/image-02.jpg`],
  video: `${dir('court-metrage')}/video.mp4`,
  videos: [],                   // vidéos supplémentaires
  externalLink: '',             // lien externe (ex. YouTube, Vimeo)
  size: 'm'                     // 's' petite, 'm' moyenne, 'l' grande bulle (facultatif)
}
```
4. Enregistre : la bulle, le filtre, le compteur et le popup se créent seuls.

**Bon à savoir**
- Tous les champs sauf `id`, `title`, `category` et `description` sont facultatifs : supprime la ligne ou laisse vide, rien ne s'affiche.
- **Ordre** = ordre dans la liste. **Supprimer** = effacer le bloc. **Modifier** = changer le texte.
- Une vidéo trop lourde ralentit le site : pour de longues vidéos, mets-les sur YouTube/Vimeo et utilise `externalLink`.
- Un fichier image manquant est remplacé par un dégradé coloré avec la première lettre du titre.
- Fonctionne avec 3 comme avec 50 projets : les bulles se répartissent seules.

---

## 3. Modifier le curseur de la souris

Le curseur (un rond + un petit texte) est visible uniquement sur ordinateur, pas sur mobile.

- **Couleur et taille** : dans `src/styles.css`, cherche `.cursor::before` :
  - `width:14px;height:14px` = taille au repos
  - `background:var(--lamp)` = couleur (mets un code `#RRGGBB`)
  - `.cursor.big::before{transform:scale(4.2)}` = agrandissement sur un élément cliquable
- **Couleur du texte** (VIEW, OPEN…) : `.cursor span{color:var(--ink)}`.
- **Fluidité** : dans `src/components/Cursor.jsx`, la valeur `0.25` (entre 0.05 = très traînant et 1 = collé à la souris).
- **Changer les mots** : chaque élément cliquable porte `data-cursor="VIEW"`. Change le mot entre guillemets dans le fichier concerné (`Projects.jsx` = bulles, `Nav.jsx` = objets, `Modal.jsx` = fermer…). Sans `data-cursor`, le rond reste petit.
- **Désactiver le curseur perso** : dans `src/App.jsx`, supprime la ligne `<Cursor />` (et l'import).

---

## 4. Textes de la page d'accueil et des objets

Tout est dans `src/data/site.js` :

```js
name: 'Manon',                                   // grand titre
tagline: 'Creative designer / Motion / 3D / Visuals',
hint: 'Explore my universe — choisis un objet',  // petite phrase en jaune-vert
nav: [
  { id: 'profile', icon: '🎩', label: 'Profil', hint: 'Qui je suis', x: 16, y: 62 },
  ...
]
```
- `label` = nom de l'objet. `hint` = petite description sous le nom.
- **Pourquoi la description semble cachée ?** Sur ordinateur, la description (`hint`) n'apparaît qu'au survol, pour garder l'accueil épuré. Sur mobile/tablette, elle est toujours visible.
- **La rendre toujours visible sur ordinateur** : dans `src/styles.css`, supprime cette ligne :
  `@media (hover:hover){.lab small{opacity:0;...}.obj:hover .lab small,...{opacity:1;transform:none}}`
- **Bulles de projets** : sous la bulle s'affichent uniquement titre, catégorie et année (au survol sur ordinateur). La description complète est dans le popup. Pour afficher le titre en permanence, supprime la ligne `@media (hover:hover){.cap{opacity:0;...}}`. Pour changer le texte sous la bulle, modifie `<span className="cap">` dans `src/components/Projects.jsx`.
- **Position** : `x` et `y` sont des pourcentages de l'écran (0 à 100). Sur mobile, les objets s'alignent automatiquement en bas.
- **Ordre des objets** : l'ordre de la liste. L'`id` (`profile`, `projects`, `contact`) ne doit pas être modifié.

---

## 5. Modifier les icônes des objets de l'accueil

Champ `icon` de chaque objet dans `nav` (`src/data/site.js`).

- **Un emoji** : `icon: '🎩'`. Remplace par n'importe quel emoji.
- **Ta propre image** (PNG transparent, SVG ou WebP, ~300×300 px) :
  1. Dépose-la dans `public/icons/` (ex. `chapeau.png`).
  2. Écris `icon: '/icons/chapeau.png'`.
  Le site détecte automatiquement qu'il s'agit d'une image.
- Le fond (la bulle arrondie) reste géré par le CSS : `.ico` dans `src/styles.css`. Pour une bulle plus grande, modifie `width:clamp(78px,10vw,116px)`.

---

## 6. Page Profil

**Modifier la description** — `src/data/site.js` :
```js
profile: {
  title: 'Profil',
  text: [
    "Premier paragraphe.",
    "Deuxième paragraphe."
  ]
}
```
Chaque texte entre guillemets = un paragraphe. Ajoute ou retire des lignes (sépare-les par une virgule). Si ton texte contient des guillemets `"`, utilise des apostrophes typographiques ’ ou entoure le texte de `'...'` en veillant à ne pas y mettre d'apostrophe droite `'`.

**Couleurs hard skills / soft skills** — `src/styles.css`, tout en haut :
```css
--hard:#D2F55F;   /* logiciels : vert lime */
--soft:#F2B880;   /* qualités : pêche */
```
Remplace par tes couleurs (code hexadécimal, ex. via un sélecteur de couleurs en ligne). Une petite légende s'affiche sous ton texte.

**Gérer les compétences** — `src/data/site.js` :
```js
export const skills = {
  hard: ['After Effects', 'Premiere Pro', 'Blender'],
  soft: ['Créativité', 'Curiosité', 'Autonomie']
}
```
- **Remplacer** : change le texte. **Ajouter** : ajoute `, 'Nouvelle compétence'`. **Supprimer** : efface l'élément et sa virgule.
- Les étoiles se répartissent automatiquement en cercle. Pour rester lisible : environ 8 à 10 compétences par liste maximum, noms courts.
- `hard` = orbite extérieure, `soft` = orbite intérieure.

**CV** : voir §9.

---

## 7. Page Projets (Réalisations)

**Ajouter un projet** : voir §2.

**Ajouter une rubrique (catégorie)** — `src/data/site.js` :
```js
export const categories = [
  { name: 'Animation', icon: '🎬' },
  { name: 'Graphisme', icon: '🖌️' },
  { name: 'Illustration', icon: '✏️' }   // nouvelle rubrique
]
```
Puis, dans `projects.js`, utilise exactement le même nom : `category: 'Illustration'`.
- Une catégorie **sans projet n'apparaît pas**. Dès qu'un projet l'utilise, sa pastille apparaît seule, avec son compteur. « Tous » est automatique.
- **Renommer** une catégorie : change son nom à la fois dans `categories` et dans chaque projet concerné.
- **Ordre des pastilles** = ordre de la liste. L'`icon` peut être un emoji ou un chemin d'image.
- Si tu oublies de déclarer une catégorie mais qu'un projet l'utilise, elle apparaît quand même (avec l'icône ✦).

**Modifier le contenu des popups**
- **Les informations** (titre, textes, rôle, logiciels, images, vidéo, lien, année) : dans `projects.js`, pour chaque projet.
- **La mise en page** (titres « Mon rôle », « Logiciels », « Catégorie »…, ordre des blocs) : `src/components/Modal.jsx`. Les libellés sont dans les lignes `<Row label="Mon rôle">…`.
- **Apparence** (couleur du fond, arrondis, taille) : `.sheet`, `.modal` et `.gallery` dans `src/styles.css`.
- Fermeture : croix, touche Échap, ou clic à côté du popup.

---

## 8. Page Contact et réseaux sociaux

**Remplacer les lettres (f, in…) par les logos**
Les logos Gmail, WhatsApp, LinkedIn et Facebook sont déjà fournis dans `public/icons/` et utilisés par défaut. Dans `src/data/site.js` :
```js
socials: [
  { id: 'mail', label: 'Gmail', href: 'mailto:ton.adresse@gmail.com', logo: '/icons/gmail.svg' },
  ...
]
```
Pour ton propre logo : dépose-le dans `public/icons/` (SVG ou PNG transparent, idéalement clair sur fond sombre) et écris `logo: '/icons/mon-logo.svg'`. Si `logo` est absent, tu peux utiliser `glyph: 'f'` (simple texte ou emoji).

**Ajouter ou modifier les liens**
- `href` = le lien ouvert au clic.
  - E-mail : `mailto:ton.adresse@gmail.com`
  - LinkedIn : `https://www.linkedin.com/in/ton-profil`
  - Facebook : `https://www.facebook.com/ton-profil`
  - WhatsApp : `https://wa.me/ton-numero-avec-indicatif` (ex. `https://wa.me/32470123456`) ou ton lien `wa.me/qr/...`
- **Ajouter un réseau** (Instagram, ArtStation, Behance…) : copie une ligne, change `id`, `label`, `href` et `logo` (logos gratuits sur simpleicons.org, à télécharger en SVG). Pense à la virgule entre les lignes.
- **Supprimer un réseau** : efface sa ligne.
- Les liens externes s'ouvrent dans un nouvel onglet ; le mail ouvre la messagerie.

**Faire fonctionner le formulaire**
1. Crée un formulaire gratuit sur formspree.io et copie son URL (`https://formspree.io/f/xxxxxx`).
2. Netlify → *Site configuration → Environment variables* → ajoute `VITE_FORM_ENDPOINT` = cette URL.
3. Relance un déploiement (*Deploys → Trigger deploy*).
Tant que ce n'est pas fait, le formulaire affiche « Formulaire non configuré ». Aucun secret n'est écrit dans le code.

---

## 9. Ajouter un CV téléchargeable

1. Dépose ton PDF dans `public/` (ex. `cv-manon.pdf`). Le fichier fourni est un exemple vierge : **remplace-le** en gardant le même nom, ou change le nom dans l'étape 2.
2. Dans `src/data/site.js` :
```js
cv: { label: 'Télécharger mon CV', file: '/cv-manon.pdf' },
```
3. Le bouton apparaît automatiquement sur la page **Profil** et sur la page **Contact**.
4. **Masquer le bouton** : `file: ''`.
5. Garde un PDF léger (moins de 2 Mo) et un nom de fichier sans espaces ni accents.

---

## 10. Dépannage rapide

| Problème | Cause probable |
|---|---|
| Page blanche après modification | Virgule, guillemet ou accolade manquant dans un fichier `.js` |
| Mon image ne s'affiche pas (dégradé à la place) | Nom, majuscules ou extension du fichier différents du chemin écrit |
| Un projet n'apparaît pas dans son filtre | La catégorie du projet ne correspond pas exactement (accents, majuscules) |
| Le changement n'est pas en ligne | Attendre 1–2 min le déploiement Netlify, puis rechargement forcé |
| Le site est lent | Images ou vidéos trop lourdes : compresser (JPG/WebP, vidéo < 8 Mo) |
| La vidéo d'accueil ne tourne pas sur mobile | Économie d'énergie du téléphone : l'image `poster` est alors affichée |
