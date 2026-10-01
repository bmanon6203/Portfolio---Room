# Portfolio de Manon

React + Vite, sans autre dépendance. Hébergement : GitHub → Netlify.

## Mettre en ligne (une seule fois)
1. Crée un dépôt GitHub et envoie ce dossier (`git init`, `git add .`, `git commit`, `git push`).
2. Sur Netlify : **Add new site → Import from Git** → choisis le dépôt. Les réglages (`npm run build`, dossier `dist`) sont déjà dans `netlify.toml`.
3. Chaque `git push` republie le site automatiquement.

## Ajouter un projet (3 étapes)
1. Crée `public/projects/mon-projet/` et dépose `thumbnail.jpg`, `cover.jpg`, images, `video.mp4`.
2. Dans `src/data/projects.js`, copie un bloc de projet et modifie-le.
3. Enregistre : la bulle, le filtre, le popup et le compteur se créent tout seuls.
Un fichier manquant n'est pas bloquant (un dégradé le remplace). Modifier / supprimer / réordonner = éditer ou déplacer le bloc.

## Modifier le reste — `src/data/site.js`
Nom, texte du profil, décor (`background`), objets de navigation, réseaux sociaux, catégories (une catégorie sans projet n'apparaît pas), compétences.

## Décor d'accueil
Remplace `public/background.jpg`, ou mets `type: 'video'` dans `site.js` et dépose `public/background.mp4` (10–20 s, 1080p, < 8 Mo, sans son).

## Formulaire de contact
Crée un formulaire sur formspree.io, puis dans Netlify → Site configuration → Environment variables : `VITE_FORM_ENDPOINT` = l'URL Formspree. Redéploie. Aucun secret dans le code.

## Optimiser les images
JPG/WebP, ~1200 px de large pour les couvertures, ~600 px pour les miniatures.

## Évolution : CMS
Quand tu auras 20+ projets, un CMS Git (Decap CMS ou Sveltia CMS) peut ajouter une page `/admin` sans changer le design : le format des données est déjà prêt.

## Développer en local
`npm install` puis `npm run dev`.
