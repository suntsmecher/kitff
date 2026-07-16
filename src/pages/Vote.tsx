import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Flame, Trophy } from 'lucide-react'
import { voteSites, votingRewards, topSupporters } from '../data/mock'

export default function Vote() {
  const [sites, setSites] = useState(voteSites)
  const streak = 4

  const castVote = (id: number) => {
    setSites((s) => s.map((v) => (v.id === id ? { ...v, voted: true } : v)))
  }

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-5 md:px-8 min-h-screen">
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-wider text-[var(--color-gold)] uppercase">Vote</span>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-white mt-3">
          Vote for KitFFA
        </h1>
        <p className="text-sm text-[var(--color-steel-light)] mt-2 max-w-lg">
          Every vote helps the server climb the rankings — and pays you back in coins, keys, and streak bonuses.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
        <div className="space-y-3">
          {sites.map((site) => (
            <motion.div
              key={site.id}
              layout
              className="glass rounded-xl p-5 flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-white">{site.name}</div>
                <div className="text-xs text-[var(--color-steel)] mt-1">
                  Cooldown: {site.cooldownHours}h
                </div>
              </div>
              <button
                onClick={() => castVote(site.id)}
                disabled={site.voted}
                className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md transition ${
                  site.voted
                    ? 'bg-white/5 text-[var(--color-steel)] cursor-not-allowed'
                    : 'bg-[var(--color-gold)] text-black hover:brightness-110'
                }`}
              >
                {site.voted ? 'Voted' : 'Vote'}
                {!site.voted && <ExternalLink size={14} />}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={16} className="text-[var(--color-gold)]" />
              <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">Your streak</h2>
            </div>
            <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-gold-gradient mb-1">
              {streak} days
            </div>
            <p className="text-xs text-[var(--color-steel)] mb-4">Vote today to keep it alive.</p>
            <div className="space-y-2">
              {votingRewards.map((r) => (
                <div
                  key={r.streak}
                  className={`flex items-center justify-between text-xs rounded-md px-3 py-2 ${
                    streak >= r.streak ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]' : 'bg-black/20 text-[var(--color-steel)]'
                  }`}
                >
                  <span>{r.streak}-day streak</span>
                  <span>{r.reward}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={16} className="text-[var(--color-gold)]" />
              <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">Vote leaderboard</h2>
            </div>
            <div className="space-y-2">
              {topSupporters.slice(0, 5).map((s, i) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-steel-light)]">
                    <span className="text-[var(--color-steel)] mr-2">{i + 1}</span>
                    {s.username}
                  </span>
                  <span className="text-[var(--color-gold)] font-[family-name:var(--font-mono)] text-xs">
                    {s.amount - 60} votes
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
