// ═══ TES INFORMATIONS — modifie uniquement ce fichier pour le texte du site ═══
export const site = {
  name: 'Manon',
  tagline: 'Creative designer / Motion / 3D / Visuals',
  hint: 'Explore my universe — choisis un objet',
  // Décor d'accueil : type "image" (public/background.jpg) ou "video" (public/background.mp4)
  background: { type: 'image', src: '/background.jpg', poster: '/background.jpg' },
  profile: {
    title: 'Profil',
    text: [
      "PLACEHOLDER — Étudiante en BUT MMI, je crée des univers en animation 3D, motion design et post-production.",
      "PLACEHOLDER — Ajoute ici 2 ou 3 phrases sur ton parcours, ce qui t'anime et ce que tu recherches."
    ]
  },
  // Objets de navigation (la vue "projects" / "profile" / "contact" est fixe ; libellés, icônes et positions modifiables)
  nav: [
    { id: 'profile',  icon: '🎩', label: 'Profil',  hint: 'Qui je suis',       x: 16, y: 62 },
    { id: 'projects', icon: '🎞️', label: 'Projets', hint: 'Mes réalisations', x: 50, y: 74 },
    { id: 'contact',  icon: '💌', label: 'Contact', hint: 'Écrivons-nous',     x: 84, y: 62 }
  ],
  // Contact / réseaux : remplace les valeurs MON_...
  socials: [
    { id: 'mail',     label: 'Gmail',    href: 'mailto:b.manon6203@gmail.com', logo: '/icons/gmail.svg' },
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/qr/FSFPNOQU4EIOP1', logo: '/icons/whatsapp.svg' },
    { id: 'linkedin', label: 'LinkedIn', href: 'MON_LIEN_LINKEDIN',         logo: '/icons/linkedin.svg' },
    { id: 'facebook', label: 'Facebook', href: 'MON_LIEN_FACEBOOK',         logo: '/icons/facebook.svg' }
  ],
  // CV téléchargeable : dépose ton PDF dans public/ et indique son nom ici (file: '' pour masquer le bouton)
  cv: { label: 'Télécharger mon CV', file: '/cv-manon.pdf' },
  // Endpoint du formulaire (Formspree, etc.) : défini dans Netlify > Environment variables : VITE_FORM_ENDPOINT
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || ''
}

// Catégories : ajoute-en une ici, elle apparaît toute seule (seulement si elle contient au moins un projet)
export const categories = [
  { name: 'Animation', icon: '🎬' },
  { name: 'Post-production', icon: '🎚️' },
  { name: 'Jeu vidéo', icon: '🎮' },
  { name: 'Graphisme', icon: '🖌️' },
  { name: 'Stop Motion', icon: '🧶' },
  { name: 'Autres', icon: '✦' }
]

export const skills = {
  hard: ['After Effects', 'Premiere Pro', 'Photoshop', 'Illustrator', 'Blender', 'Cinema 4D', 'Substance Painter'],
  soft: ['Créativité', 'Curiosité', 'Autonomie', "Travail d'équipe", 'Adaptabilité', 'Organisation', 'Communication']
}
