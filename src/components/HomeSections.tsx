import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Crown } from 'lucide-react'
import { updates, topSupporters, storeCategories, products } from '../data/mock'

export function Updates() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[var(--color-gold)] uppercase">
            Dispatch
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white mt-3">
            Latest updates
          </h2>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {updates.map((u, i) => (
          <motion.article
            key={u.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-xl p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2 py-1 rounded">
                {u.tag}
              </span>
              <span className="text-xs text-[var(--color-steel)]">{u.date}</span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-white mb-2 leading-snug">
              {u.title}
            </h3>
            <p className="text-sm text-[var(--color-steel-light)] leading-relaxed">{u.summary}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function Supporters() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <div className="glass rounded-2xl p-6 md:p-10 grid md:grid-cols-[0.9fr_1.1fr] gap-10">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[var(--color-gold)] uppercase">
            Hall of fame
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white mt-3 mb-4">
            Top supporters
          </h2>
          <p className="text-sm text-[var(--color-steel-light)] leading-relaxed max-w-sm">
            Every purchase funds new arenas, anti-cheat tuning, and season rewards. These players
            back it the most this month.
          </p>
        </div>
        <div className="space-y-2">
          {topSupporters.map((s, i) => (
            <div
              key={s.id}
              className="flex items-center gap-4 bg-black/20 rounded-lg px-4 py-3 border border-white/5"
            >
              <span className="w-5 text-center font-[family-name:var(--font-mono)] text-sm text-[var(--color-steel)]">
                {i + 1}
              </span>
              <div className="h-8 w-8 rounded-full bg-[var(--color-gold)]/15 flex items-center justify-center text-xs font-semibold text-[var(--color-gold)]">
                {s.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{s.username}</div>
                <div className="text-xs text-[var(--color-steel)]">{s.rank}</div>
              </div>
              {i === 0 && <Crown size={16} className="text-[var(--color-gold)]" />}
              <div className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-gold)]">
                ${s.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StorePreview() {
  const preview = products.slice(0, 4)
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[var(--color-gold)] uppercase">
            {storeCategories.length - 1} categories
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white mt-3">
            From the store
          </h2>
        </div>
        <Link
          to="/store"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[var(--color-gold)] hover:brightness-110"
        >
          Browse all <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {preview.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-xl overflow-hidden group hover:border-[var(--color-gold)]/30 transition-colors"
          >
            <div
              className="h-28 flex items-center justify-center text-3xl font-[family-name:var(--font-display)] font-bold"
              style={{ background: `linear-gradient(135deg, ${p.color}22, transparent)`, color: p.color }}
            >
              {p.name[0]}
            </div>
            <div className="p-4">
              <div className="text-[10px] uppercase tracking-wider text-[var(--color-steel)] mb-1">
                {p.category}
              </div>
              <h3 className="text-sm font-semibold text-white mb-2 truncate">{p.name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-gold)]">
                  ${p.price}
                </span>
                <Link
                  to="/store"
                  className="text-xs font-medium px-2.5 py-1 rounded bg-white/5 text-white group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function OwnerAnnouncement() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-8 md:p-10 border-l-4 border-l-[var(--color-gold)] flex gap-6 items-start"
      >
        <div className="h-12 w-12 rounded-full bg-[var(--color-gold)]/15 flex items-center justify-center text-lg font-semibold text-[var(--color-gold)] shrink-0">
          M
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-white">Marrow</span>
            <span className="text-[10px] uppercase tracking-wide text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2 py-0.5 rounded">
              Owner
            </span>
          </div>
          <p className="text-[var(--color-steel-light)] leading-relaxed">
            Season 9 changes the netherite kit balance for the first time in a year — full patch
            notes are on Discord. Thanks for making The Hollow the busiest arena we've launched.
            See you in the fight.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
