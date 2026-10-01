import { site } from '../data/site.js'

// Bouton de téléchargement du CV (réglé dans data/site.js > cv). Masqué si aucun fichier n'est indiqué.
export default function CvLink() {
  if (!site.cv?.file) return null
  return <a className="btn" href={site.cv.file} download data-cursor="CV">{site.cv.label}</a>
}
