// ═══ TES PROJETS ═══
// Ajouter un projet : 1) crée public/projects/<id>/ et dépose tes médias (thumbnail.jpg, cover.jpg, image-01.jpg, video.mp4…)
//                     2) copie un bloc ci-dessous, change les infos  3) c'est tout.
// Champs facultatifs : cover, details, images, video, videos, externalLink, client, year, size ("s" | "m" | "l")
// Ordre d'affichage = ordre de la liste. Un média manquant est remplacé par un dégradé.
const dir = (id) => `/projects/${id}`

export const projects = [
  {
    id: 'cactoon',
    title: 'Cactoon',
    category: 'Animation',
    year: '', // PLACEHOLDER — ex. '2025'
    thumbnail: `${dir('cactoon')}/thumbnail.jpg`,
    cover: `${dir('cactoon')}/cover.jpg`,
    description: 'Cactoon met en scène Spike, un personnage vivant des situations simples et décalées.',
    details: "Le style se rapproche du dessin animé 2D, avec un travail sur le rythme, la fluidité et les effets de lumière. PLACEHOLDER — ajoute ta démarche.",
    role: ['Animation 2D'],
    software: [],
    size: 'l'
  },
  {
    id: 'chupachups',
    title: 'ChupaChups',
    category: 'Graphisme',
    year: '',
    thumbnail: `${dir('chupachups')}/thumbnail.jpg`,
    description: "Moderniser l'identité visuelle tout en conservant son ADN.",
    details: "J'ai proposé une direction artistique inspirée du pop art, avec la création d'un logo, d'une affiche et d'une bannière, dans un univers coloré et dynamique.",
    role: ['Direction artistique', 'Logo', 'Affiche', 'Bannière'],
    software: ['Illustrator']
  },
  {
    id: 'storytelling-visuel',
    title: 'Storytelling Visuel',
    category: 'Graphisme',
    year: '',
    thumbnail: `${dir('storytelling-visuel')}/thumbnail.jpg`,
    description: 'Six illustrations racontent le passage du temps et la transformation.',
    details: "Une histoire se développe à travers six illustrations, en laissant une part d'interprétation au spectateur.",
    role: ['Illustration', 'Storytelling'],
    software: ['Illustrator']
  },
  {
    id: 'livre-coloriage-cactoon',
    title: 'Livre coloriage Cactoon',
    category: 'Graphisme',
    year: '',
    thumbnail: `${dir('livre-coloriage-cactoon')}/thumbnail.jpg`,
    description: "Un livre de coloriage autour des quatre saisons avec les personnages de la chaîne.",
    details: "PLACEHOLDER — complète avec la suite de ta description.",
    role: ['Illustration'],
    software: []
  }
]
