import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircle, Clock, Gift, Zap, CheckCircle2, History } from 'lucide-react'
import { adRewardPool, adRewardsState, adClaimHistory, type AdReward } from '../data/mock'

type ClaimStatus = 'idle' | 'playing' | 'claimed'

export default function AdRewards() {
  const [watchedToday, setWatchedToday] = useState(adRewardsState.watchedToday)
  const [cooldowns, setCooldowns] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<Record<string, ClaimStatus>>({})
  const [toast, setToast] = useState<string | null>(null)

  const limitReached = watchedToday >= adRewardsState.dailyLimit

  const watchAd = (reward: AdReward) => {
    if (limitReached || cooldowns[reward.id] || status[reward.id] === 'playing') return

    setStatus((s) => ({ ...s, [reward.id]: 'playing' }))

    // Simulates: ad plays -> backend verifies completion -> reward granted
    setTimeout(() => {
      setStatus((s) => ({ ...s, [reward.id]: 'claimed' }))
      setWatchedToday((w) => w + 1)
      setCooldowns((c) => ({ ...c, [reward.id]: true }))
      setToast(`Claimed: ${reward.amount}`)
      setTimeout(() => setToast(null), 3000)
      setTimeout(() => setStatus((s) => ({ ...s, [reward.id]: 'idle' })), 1200)
    }, 1800)
  }

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-5 md:px-8 min-h-screen">
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-wider text-[var(--color-gold)] uppercase">Rewards</span>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-white mt-3">
          Ad Rewards
        </h1>
        <p className="text-sm text-[var(--color-steel-light)] mt-2 max-w-lg">
          Watch a short ad to instantly claim coins, keys, and boosts. Rewards are granted the moment
          playback finishes.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
        <div>
          {limitReached && (
            <div className="glass rounded-xl p-4 mb-4 text-sm text-[var(--color-steel-light)] border-[var(--color-ember)]/20">
              You've hit today's ad limit ({adRewardsState.dailyLimit}). Come back after the reset to earn more.
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {adRewardPool.map((reward) => {
              const st = status[reward.id] ?? 'idle'
              const onCooldown = cooldowns[reward.id]
              const disabled = limitReached || onCooldown || st === 'playing'

              return (
                <motion.div key={reward.id} layout className="glass rounded-xl p-5 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${reward.color}1a`, border: `1px solid ${reward.color}4d` }}
                    >
                      <Gift size={18} style={{ color: reward.color }} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wide text-[var(--color-steel)] bg-white/5 px-2 py-1 rounded">
                      {reward.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white">{reward.name}</h3>
                  <p className="text-xs text-[var(--color-steel)] mt-1 mb-4 flex-1">{reward.description}</p>

                  <div className="flex items-center justify-between text-[11px] text-[var(--color-steel)] mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} /> {reward.cooldownMinutes}m cooldown
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[var(--color-gold)]">
                      {reward.amount}
                    </span>
                  </div>

                  <button
                    onClick={() => watchAd(reward)}
                    disabled={disabled}
                    className={`inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-md transition ${
                      st === 'claimed'
                        ? 'bg-[var(--color-gold)]/15 text-[var(--color-gold)]'
                        : disabled
                        ? 'bg-white/5 text-[var(--color-steel)] cursor-not-allowed'
                        : 'bg-[var(--color-gold)] text-black hover:brightness-110'
                    }`}
                  >
                    {st === 'playing' && (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="h-3.5 w-3.5 border-2 border-black/40 border-t-black rounded-full"
                        />
                        Playing ad…
                      </>
                    )}
                    {st === 'claimed' && (
                      <>
                        <CheckCircle2 size={16} /> Claimed
                      </>
                    )}
                    {st === 'idle' && (
                      <>
                        <PlayCircle size={16} />
                        {onCooldown ? 'On cooldown' : 'Watch Ad'}
                      </>
                    )}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-[var(--color-gold)]" />
              <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">Today</h2>
            </div>
            <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-gold-gradient mb-1">
              {watchedToday}/{adRewardsState.dailyLimit}
            </div>
            <p className="text-xs text-[var(--color-steel)] mb-4">Ads watched today.</p>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-[var(--color-gold)] transition-all"
                style={{ width: `${Math.min(100, (watchedToday / adRewardsState.dailyLimit) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-[var(--color-steel)] mt-3">
              Limit resets in {adRewardsState.nextResetHours}h.
            </p>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <History size={16} className="text-[var(--color-gold)]" />
              <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">Recent claims</h2>
            </div>
            <div className="space-y-2">
              {adClaimHistory.map((c) => (
                <div key={c.id} className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-steel-light)]">{c.reward}</span>
                  <span className="text-[var(--color-steel)] text-xs">{c.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 glass rounded-lg px-4 py-3 text-sm text-white flex items-center gap-2 z-50"
          >
            <CheckCircle2 size={16} className="text-[var(--color-gold)]" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
