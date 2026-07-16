import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Swords, ShoppingBag, ArrowUpRight, MessageCircle, User, Copy, Check } from 'lucide-react'
import ParticleField from './ParticleField'
import { killFeed, serverStats } from '../data/mock'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [feedIndex, setFeedIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ x, y })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setFeedIndex((i) => (i + 1) % killFeed.length), 2200)
    return () => clearInterval(id)
  }, [])

  const copyIp = () => {
    navigator.clipboard?.writeText(serverStats.ip)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const visibleFeed = [killFeed[feedIndex], killFeed[(feedIndex + 1) % killFeed.length], killFeed[(feedIndex + 2) % killFeed.length]]

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1a1f_0%,_#0a0a0c_60%)]" />
      <ParticleField />
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--color-gold)]/10 blur-[120px]"
        style={{ transform: `translate(${tilt.x * -20}px, ${tilt.y * -20}px)` }}
      />
      <div
        className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--color-ember)]/10 blur-[120px]"
        style={{ transform: `translate(${tilt.x * 20}px, ${tilt.y * 20}px)` }}
      />

      <div className="relative max-w-7xl mx-auto w-full px-5 md:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        {/* left: thesis */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs font-medium text-[var(--color-gold)] mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
            Season 9 — Obsidian Reign is live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-white"
          >
            No teams.
            <br />
            No truce.
            <br />
            <span className="text-gold-gradient">Just kills.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-[var(--color-steel-light)] max-w-lg"
          >
            KitFFA is a free-for-all combat server built around one idea: the fight is the whole
            game. Six arenas, custom enchants, and a ladder that resets every season.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={copyIp}
              className="group inline-flex items-center gap-2 rounded-md bg-[var(--color-gold)] text-black font-semibold px-5 py-3 text-sm gold-glow hover:brightness-110 transition"
            >
              <Swords size={16} />
              {copied ? 'Copied!' : `Play — ${serverStats.ip}`}
              {copied ? <Check size={14} /> : <Copy size={14} className="opacity-60 group-hover:opacity-100" />}
            </button>
            <a
              href="/store"
              className="inline-flex items-center gap-2 rounded-md glass px-5 py-3 text-sm font-medium text-white hover:border-[var(--color-gold)]/40 transition"
            >
              <ShoppingBag size={16} />
              Store
            </a>
            <a
              href="#discord"
              className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-[var(--color-steel-light)] hover:text-white transition"
            >
              <MessageCircle size={16} />
              Discord
              <ArrowUpRight size={13} />
            </a>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-[var(--color-steel-light)] hover:text-white transition"
            >
              <User size={16} />
              Account
            </a>
          </motion.div>

          {/* animated stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-12 grid grid-cols-3 max-w-md gap-6"
          >
            <Stat label="Online now" value={serverStats.playersOnline.toLocaleString()} />
            <Stat label="Kills today" value={serverStats.killsToday.toLocaleString()} />
            <Stat label="Uptime" value={`${serverStats.uptime}%`} />
          </motion.div>
        </div>

        {/* right: signature — live kill feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ transform: `translate(${tilt.x * 10}px, ${tilt.y * 10}px)` }}
          className="glass rounded-2xl p-5 gold-glow"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold tracking-wider text-[var(--color-steel)] uppercase">
              Live Kill Feed
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-gold)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
              The Hollow
            </span>
          </div>

          <div className="space-y-2 h-40">
            {visibleFeed.map((k, i) => (
              <motion.div
                key={`${k.id}-${feedIndex}-${i}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1 - i * 0.28, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between font-[family-name:var(--font-mono)] text-xs bg-black/30 rounded-lg px-3 py-2.5 border border-white/5"
              >
                <span>
                  <span className="text-white font-medium">{k.killer}</span>
                  <span className="text-[var(--color-ember)] mx-1.5">✕</span>
                  <span className="text-[var(--color-steel-light)]">{k.victim}</span>
                </span>
                <span className="text-[var(--color-steel)]">{k.weapon}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
            <MiniStat label="Peak today" value={serverStats.playersPeak.toLocaleString()} />
            <MiniStat label="Active arenas" value="6" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">{value}</div>
      <div className="text-xs text-[var(--color-steel)] mt-0.5">{label}</div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/20 rounded-lg px-3 py-2">
      <div className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-gold)]">
        {value}
      </div>
      <div className="text-[10px] text-[var(--color-steel)] uppercase tracking-wide mt-0.5">{label}</div>
    </div>
  )
}
