// Affiche soit un emoji / texte, soit une image si la valeur est un chemin (/icons/x.svg) ou une URL.
export default function Icon({ value }) {
  const isImg = typeof value === 'string' && /^(\/|https?:)|\.(png|svg|webp|jpe?g)$/i.test(value)
  return isImg ? <img className="icon-img" src={value} alt="" aria-hidden="true" /> : <>{value}</>
}
