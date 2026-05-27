import logoImg from '../assets/logo.png'

export default function Logo({ size = 'default' }) {
  const sizes = {
    small: { box: 'w-8 h-8', text: 'text-lg' },
    default: { box: 'w-9 h-9', text: 'text-xl' },
    large: { box: 'w-11 h-11', text: 'text-2xl' },
  }
  const s = sizes[size] || sizes.default

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.box} rounded-xl overflow-hidden shadow-sm border border-slate-100 flex items-center justify-center bg-white shrink-0`}>
        <img src={logoImg} alt="Aurevia One Logo" className="w-[85%] h-[85%] object-contain" />
      </div>
      <span className={`${s.text} font-bold text-slate-900 tracking-tight whitespace-nowrap`}>
        Aurevia <span className="text-emerald-600">One</span>
      </span>
    </div>
  )
}
