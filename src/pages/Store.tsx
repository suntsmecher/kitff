import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Tag, Trash2 } from 'lucide-react'
import { products, storeCategories, type Product } from '../data/mock'

export default function Store() {
  const [active, setActive] = useState<(typeof storeCategories)[number]>('All')
  const [cart, setCart] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const filtered = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.category === active)),
    [active],
  )

  const subtotal = cart.reduce((sum, p) => sum + p.price, 0)
  const discount = couponApplied ? subtotal * 0.1 : 0
  const total = subtotal - discount

  const addToCart = (p: Product) => {
    setCart((c) => [...c, p])
    setCartOpen(true)
  }

  const removeFromCart = (index: number) => {
    setCart((c) => c.filter((_, i) => i !== index))
  }

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'SEASON9') setCouponApplied(true)
  }

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-5 md:px-8 min-h-screen">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[var(--color-gold)] uppercase">
            Store
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-white mt-3">
            Gear up for the arena
          </h1>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="relative inline-flex items-center gap-2 rounded-md glass px-4 py-2.5 text-sm font-medium text-white hover:border-[var(--color-gold)]/40 transition"
        >
          <ShoppingCart size={16} />
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[var(--color-gold)] text-black text-[11px] font-bold flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
        {storeCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              active === cat
                ? 'bg-[var(--color-gold)] text-black'
                : 'glass text-[var(--color-steel-light)] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="glass rounded-xl overflow-hidden group hover:border-[var(--color-gold)]/30 transition-colors flex flex-col"
            >
              <div
                className="h-36 flex items-center justify-center text-4xl font-[family-name:var(--font-display)] font-bold relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.color}22, transparent)`, color: p.color }}
              >
                <motion.span
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {p.name[0]}
                </motion.span>
                {p.originalPrice && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide bg-[var(--color-ember)] text-white px-2 py-1 rounded">
                    Sale
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-[10px] uppercase tracking-wider text-[var(--color-steel)] mb-1">
                  {p.category}
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-white mb-2">
                  {p.name}
                </h3>
                <p className="text-sm text-[var(--color-steel-light)] leading-relaxed mb-4 flex-1">
                  {p.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-[family-name:var(--font-mono)] text-lg text-[var(--color-gold)]">
                      ${p.price}
                    </span>
                    {p.originalPrice && (
                      <span className="text-xs text-[var(--color-steel)] line-through">
                        ${p.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="text-sm font-semibold px-3 py-2 rounded-md bg-white/5 text-white hover:bg-[var(--color-gold)] hover:text-black transition-colors"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-[var(--color-charcoal)] border-l border-white/10 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <h2 className="font-[family-name:var(--font-display)] font-semibold text-white">
                  Your cart
                </h2>
                <button onClick={() => setCartOpen(false)} className="text-[var(--color-steel-light)] hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-sm text-[var(--color-steel)] text-center mt-10">
                    Nothing here yet — add something from the store.
                  </p>
                ) : (
                  cart.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-black/20 rounded-lg p-3 border border-white/5">
                      <div
                        className="h-10 w-10 rounded-md flex items-center justify-center font-semibold text-sm shrink-0"
                        style={{ background: `${p.color}22`, color: p.color }}
                      >
                        {p.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate">{p.name}</div>
                        <div className="text-xs text-[var(--color-gold)] font-[family-name:var(--font-mono)]">
                          ${p.price}
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(i)} className="text-[var(--color-steel)] hover:text-[var(--color-ember)]">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-steel)]" />
                      <input
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Discount code"
                        className="w-full bg-black/30 border border-white/10 rounded-md pl-9 pr-3 py-2 text-sm text-white placeholder:text-[var(--color-steel)] focus:outline-none focus:border-[var(--color-gold)]/50"
                      />
                    </div>
                    <button
                      onClick={applyCoupon}
                      className="text-sm font-medium px-3 py-2 rounded-md glass text-white hover:border-[var(--color-gold)]/40"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-xs text-[var(--color-gold)]">SEASON9 applied — 10% off</p>
                  )}
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-[var(--color-steel-light)]">
                      <span>Subtotal</span>
                      <span className="font-[family-name:var(--font-mono)]">${subtotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-[var(--color-gold)]">
                        <span>Discount</span>
                        <span className="font-[family-name:var(--font-mono)]">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white font-semibold pt-1 border-t border-white/5">
                      <span>Total</span>
                      <span className="font-[family-name:var(--font-mono)]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full rounded-md bg-[var(--color-gold)] text-black font-semibold py-3 text-sm hover:brightness-110 transition gold-glow">
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
