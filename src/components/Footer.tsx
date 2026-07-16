import { Link } from 'react-router-dom'
import { Swords, MessageCircle, AtSign, Video } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30">
              <Swords size={14} className="text-[var(--color-gold)]" />
            </span>
            <span className="font-[family-name:var(--font-display)] text-white">
              Kit<span className="text-gold-gradient">FFA</span>
            </span>
          </div>
          <p className="text-sm text-[var(--color-steel)] leading-relaxed">
            A free-for-all Minecraft combat server. No teams, no truce, just kills.
          </p>
        </div>

        <FooterCol
          title="Play"
          links={[
            { label: 'Store', to: '/store' },
            { label: 'Vote', to: '/vote' },
            { label: 'Account', to: '/dashboard' },
          ]}
        />
        <FooterCol
          title="Server"
          links={[
            { label: 'Rules', to: '/' },
            { label: 'Support', to: '/' },
            { label: 'Status', to: '/' },
          ]}
        />
        <div>
          <div className="text-sm font-semibold text-white mb-3">Community</div>
          <div className="flex gap-3">
            {[MessageCircle, AtSign, Video].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-md glass flex items-center justify-center text-[var(--color-steel-light)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)]/30 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-5">
        <p className="text-center text-xs text-[var(--color-steel)]">
          © 2026 KitFFA. Not affiliated with Mojang or Microsoft.
        </p>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <div className="text-sm font-semibold text-white mb-3">{title}</div>
      <div className="flex flex-col gap-2">
        {links.map((l) => (
          <Link key={l.label} to={l.to} className="text-sm text-[var(--color-steel)] hover:text-white transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
