import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Flame } from 'lucide-react'
import { votingRewards } from '../data/mock'

export default function VotingPreview() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <div className="glass rounded-2xl p-8 md:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[var(--color-gold)] uppercase">
              Vote for KitFFA
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white mt-3">
              Voting rewards
            </h2>
          </div>
          <Link
            to="/vote"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-gold)] hover:brightness-110"
          >
            Vote now <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {votingRewards.map((r, i) => (
            <motion.div
              key={r.streak}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-black/20 border border-white/5 rounded-xl p-5 text-center"
            >
              <div className="flex items-center justify-center gap-1 text-[var(--color-gold)] mb-2">
                <Flame size={14} />
                <span className="font-[family-name:var(--font-mono)] text-sm">{r.streak}-day streak</span>
              </div>
              <div className="text-sm text-white font-medium">{r.reward}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
