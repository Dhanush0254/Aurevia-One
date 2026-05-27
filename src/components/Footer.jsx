import { Link } from 'react-router-dom'
import { Globe, MessageCircle, Users, Mail } from 'lucide-react'
import logoImg from '../assets/logo.png'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center shrink-0">
                  <img src={logoImg} alt="Aurevia One Logo" className="w-[85%] h-[85%] object-contain" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Aurevia <span className="text-emerald-400">One</span>
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              AI-powered investing made simple. From beginner to expert, invest smarter with intelligent guidance.
            </p>
            <div className="flex gap-2">
              {[Globe, MessageCircle, Users, Mail].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Explore Funds', to: '/explore' },
                { label: 'AI Assistant', to: '/ai-assistant' },
                { label: 'Learning Hub', to: '/learn' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {['What is SIP?', 'Mutual Fund Basics', 'Risk Management', 'Investment Guides'].map((item) => (
                <li key={item}>
                  <Link to="/learn" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <span className="text-slate-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © 2026 Aurevia One. This is a demo product.
          </p>
          <p className="text-slate-500 text-xs">
            Concept & Demo by Dhanush
          </p>
        </div>
      </div>
    </footer>
  )
}
