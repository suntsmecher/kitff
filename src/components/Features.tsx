import { motion } from 'framer-motion'
import { Swords, Sparkles, Trophy, ShieldCheck, type LucideIcon } from 'lucide-react'
import { features } from '../data/mock'

const icons: Record<string, LucideIcon> = { Swords, Sparkles, Trophy, ShieldCheck }

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <div className="max-w-xl mb-14">
        <span className="text-xs font-semibold tracking-wider text-[var(--color-gold)] uppercase">
          Built for the fight
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-white mt-3">
          Every system serves the arena
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => {
          const Icon = icons[f.icon]
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-xl p-6 hover:border-[var(--color-gold)]/30 transition-colors group"
            >
              <div className="h-10 w-10 rounded-lg bg-[var(--color-gold)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--color-gold)]/20 transition-colors">
                <Icon size={18} className="text-[var(--color-gold)]" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--color-steel-light)] leading-relaxed">{f.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
