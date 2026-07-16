import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Coins, Package, Gift, Sword, Bell, Settings, Ticket, Clock, CheckCircle2, Circle,
} from 'lucide-react'
import { currentUser, inventory, recentActivity, dailyRewards } from '../data/mock'

const tabs = ['Overview', 'Inventory', 'Rewards', 'Settings'] as const

export default function Dashboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Overview')
  const [code, setCode] = useState('')
  const [redeemMsg, setRedeemMsg] = useState<string | null>(null)

  const redeem = () => {
    if (!code.trim()) return
    setRedeemMsg(code.toUpperCase() === 'SEASON9LAUNCH' ? 'Already redeemed on this account.' : 'Code redeemed — check your inventory.')
    setCode('')
    setTimeout(() => setRedeemMsg(null), 3500)
  }

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-5 md:px-8 min-h-screen">
      {/* profile header */}
      <div className="glass rounded-2xl p-6 md:p-8 mb-8 flex flex-wrap items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/30 flex items-center justify-center text-2xl font-semibold text-[var(--color-gold)]">
            {currentUser.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                {currentUser.username}
              </h1>
              <span className="text-[10px] uppercase tracking-wide text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2 py-0.5 rounded">
                {currentUser.rank}
              </span>
            </div>
            <p className="text-sm text-[var(--color-steel)] mt-1">Member since {currentUser.joined}</p>
          </div>
        </div>
        <div className="flex gap-6">
          <MiniMetric label="Coins" value={currentUser.coins.toLocaleString()} icon={<Coins size={14} />} />
          <MiniMetric label="Kills" value={currentUser.kills.toLocaleString()} icon={<Sword size={14} />} />
          <MiniMetric label="K/D" value={currentUser.kd.toFixed(1)} icon={<Circle size={14} />} />
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t
                ? 'border-[var(--color-gold)] text-white'
                : 'border-transparent text-[var(--color-steel)] hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Gift size={16} className="text-[var(--color-gold)]" />
                <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">Daily rewards</h2>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {dailyRewards.map((d) => (
                  <div
                    key={d.day}
                    className={`rounded-lg p-3 text-center border ${
                      d.claimed
                        ? 'bg-[var(--color-gold)]/10 border-[var(--color-gold)]/30'
                        : 'bg-black/20 border-white/5'
                    }`}
                  >
                    <div className="text-[10px] text-[var(--color-steel)] mb-1">Day {d.day}</div>
                    {d.claimed ? (
                      <CheckCircle2 size={16} className="mx-auto text-[var(--color-gold)]" />
                    ) : (
                      <Circle size={16} className="mx-auto text-[var(--color-steel)]" />
                    )}
                    <div className="text-[10px] text-[var(--color-steel-light)] mt-1 leading-tight">{d.reward}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock size={16} className="text-[var(--color-gold)]" />
                <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">Recent activity</h2>
              </div>
              <div className="space-y-3">
                {recentActivity.map((a) => (
                  <div key={a.id} className="flex items-center justify-between text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-[var(--color-steel-light)]">{a.text}</span>
                    <span className="text-xs text-[var(--color-steel)] shrink-0 ml-4">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Ticket size={16} className="text-[var(--color-gold)]" />
                <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">Redeem code</h2>
              </div>
              <div className="flex gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-[var(--color-steel)] focus:outline-none focus:border-[var(--color-gold)]/50"
                />
                <button
                  onClick={redeem}
                  className="text-sm font-semibold px-4 py-2 rounded-md bg-[var(--color-gold)] text-black hover:brightness-110"
                >
                  Redeem
                </button>
              </div>
              {redeemMsg && <p className="text-xs text-[var(--color-steel-light)] mt-3">{redeemMsg}</p>}
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell size={16} className="text-[var(--color-gold)]" />
                <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">Notifications</h2>
              </div>
              <p className="text-sm text-[var(--color-steel-light)]">
                You're all caught up. New season announcements will show up here.
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === 'Inventory' && (
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Package size={16} className="text-[var(--color-gold)]" />
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">Inventory</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {inventory.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -2 }}
                className="flex items-center justify-between bg-black/20 border border-white/5 rounded-lg p-4"
              >
                <div>
                  <div className="text-sm text-white font-medium">{item.name}</div>
                  <div className="text-xs text-[var(--color-steel)] mt-0.5">{item.type}</div>
                </div>
                {item.equipped && (
                  <span className="text-[10px] uppercase tracking-wide text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2 py-1 rounded">
                    Equipped
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Rewards' && (
        <div className="glass rounded-xl p-6">
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-white mb-2">Vote history &amp; rewards</h2>
          <p className="text-sm text-[var(--color-steel-light)]">
            Track your voting streak and claimed rewards from the Vote page — your history syncs here automatically.
          </p>
        </div>
      )}

      {tab === 'Settings' && (
        <div className="glass rounded-xl p-6 max-w-lg">
          <div className="flex items-center gap-2 mb-5">
            <Settings size={16} className="text-[var(--color-gold)]" />
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">Profile settings</h2>
          </div>
          <div className="space-y-4">
            <Field label="Username" defaultValue={currentUser.username} />
            <Field label="Email" defaultValue="ashen.wolf@example.com" type="email" />
            <div>
              <label className="text-xs text-[var(--color-steel)] mb-1.5 block">New password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-gold)]/50" />
            </div>
            <button className="text-sm font-semibold px-4 py-2 rounded-md bg-[var(--color-gold)] text-black hover:brightness-110">
              Save changes
            </button>
            <div className="pt-4 border-t border-white/5">
              <button className="text-sm font-medium text-[var(--color-ember)] hover:brightness-110">
                Delete account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MiniMetric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="text-right">
      <div className="flex items-center justify-end gap-1.5 text-[var(--color-gold)]">
        {icon}
        <span className="font-[family-name:var(--font-mono)] text-lg text-white">{value}</span>
      </div>
      <div className="text-[10px] text-[var(--color-steel)] uppercase tracking-wide">{label}</div>
    </div>
  )
}

function Field({ label, defaultValue, type = 'text' }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label className="text-xs text-[var(--color-steel)] mb-1.5 block">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-gold)]/50"
      />
    </div>
  )
}
