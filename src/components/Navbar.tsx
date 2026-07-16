import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Swords } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/store', label: 'Store' },
  { to: '/vote', label: 'Vote' },
  { to: '/dashboard', label: 'Account' },
  { to: '/ad-rewards', label: 'Ad Rewards' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'glass' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30">
            <Swords size={16} className="text-[var(--color-gold)]" />
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg tracking-tight text-white">
            Kit<span className="text-gold-gradient">FFA</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-steel-light)] hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#discord"
            className="text-sm font-medium text-[var(--color-steel-light)] hover:text-white transition-colors px-3 py-2"
          >
            Discord
          </a>
          <Link
            to="/store"
            className="text-sm font-semibold px-4 py-2 rounded-md bg-[var(--color-gold)] text-black hover:brightness-110 transition"
          >
            Play Now
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass"
          >
            <div className="flex flex-col px-5 pb-4 gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-[var(--color-steel-light)] hover:text-white text-sm font-medium border-b border-white/5 last:border-0"
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
