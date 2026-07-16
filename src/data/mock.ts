export const serverStats = {
  playersOnline: 1247,
  playersPeak: 2103,
  killsToday: 58230,
  uptime: 99.8,
  ip: 'play.kitffa.net',
}

export const killFeed = [
  { id: 1, killer: 'Voidsplitter', victim: 'ashen_wolf', weapon: 'Netherite Sword', time: '0:02' },
  { id: 2, killer: 'zqre', victim: 'Kestrel99', weapon: 'Trident', time: '0:05' },
  { id: 3, killer: 'ObsidianFang', victim: 'lumen', weapon: 'Bow', time: '0:11' },
  { id: 4, killer: 'nyxx', victim: 'Voidsplitter', weapon: 'Netherite Axe', time: '0:14' },
  { id: 5, killer: 'Kestrel99', victim: 'ferrik', weapon: 'Netherite Sword', time: '0:19' },
  { id: 6, killer: 'ashen_wolf', victim: 'moth.exe', weapon: 'Crossbow', time: '0:23' },
]

export const features = [
  {
    title: 'Free-For-All Arenas',
    description: 'Six rotating arenas built for pure combat — no teams, no truces, just kills.',
    icon: 'Swords',
  },
  {
    title: 'Custom Enchants',
    description: 'Hand-tuned enchant tables that reward skill over grind. Every kit has a purpose.',
    icon: 'Sparkles',
  },
  {
    title: 'Season Ladder',
    description: 'Ranked seasons reset every 8 weeks with exclusive titles for the top 100.',
    icon: 'Trophy',
  },
  {
    title: 'Anti-Cheat Verified',
    description: 'Server-side detection tuned specifically for FFA combat patterns. Clean fights, always.',
    icon: 'ShieldCheck',
  },
]

export const updates = [
  {
    id: 1,
    date: 'Jul 12, 2026',
    title: 'Season 9: Obsidian Reign begins',
    summary: 'New arena "The Hollow", reworked netherite kit balance, and a fresh leaderboard.',
    tag: 'Season',
  },
  {
    id: 2,
    date: 'Jul 3, 2026',
    title: 'Ad-reward crates now drop Epic keys',
    summary: 'Watching a rewarded ad now has a 12% chance to award an Epic Crate Key instead of Coins.',
    tag: 'Rewards',
  },
  {
    id: 3,
    date: 'Jun 24, 2026',
    title: 'Voting streak bonuses added',
    summary: 'Vote 5 days in a row across all sites to unlock the Streak Crate.',
    tag: 'Voting',
  },
]

export const topSupporters = [
  { id: 1, username: 'Voidsplitter', rank: 'Netherlord', amount: 480, avatar: 'V' },
  { id: 2, username: 'Kestrel99', rank: 'Netherlord', amount: 365, avatar: 'K' },
  { id: 3, username: 'ashen_wolf', rank: 'Warbringer', amount: 210, avatar: 'A' },
  { id: 4, username: 'zqre', rank: 'Warbringer', amount: 175, avatar: 'Z' },
  { id: 5, username: 'nyxx', rank: 'Duelist', amount: 120, avatar: 'N' },
]

export const votingRewards = [
  { streak: 1, reward: '250 Coins' },
  { streak: 3, reward: 'Rare Crate Key' },
  { streak: 5, reward: 'Streak Crate + 1,000 Coins' },
  { streak: 7, reward: 'Epic Crate Key' },
]

export const voteSites = [
  { id: 1, name: 'Minecraft-Server-List', cooldownHours: 24, voted: false },
  { id: 2, name: 'Top-Minecraft-Servers', cooldownHours: 24, voted: true },
  { id: 3, name: 'Minecraft-MP', cooldownHours: 12, voted: false },
  { id: 4, name: 'PlanetMinecraft', cooldownHours: 24, voted: false },
]

export type Product = {
  id: string
  name: string
  category: 'Ranks' | 'Crates' | 'Keys' | 'Kits' | 'Coins' | 'Cosmetics' | 'Bundles'
  price: number
  originalPrice?: number
  description: string
  color: string
}

export const products: Product[] = [
  {
    id: 'rank-warbringer',
    name: 'Warbringer Rank',
    category: 'Ranks',
    price: 14.99,
    description: 'Unlocks 3 exclusive kits, a gold nametag, and +25% coin gain from kills.',
    color: '#ffd54a',
  },
  {
    id: 'rank-netherlord',
    name: 'Netherlord Rank',
    category: 'Ranks',
    price: 29.99,
    originalPrice: 39.99,
    description: 'The top-tier rank. Every perk, a particle trail, and priority queue access.',
    color: '#ff5c5c',
  },
  {
    id: 'crate-epic',
    name: 'Epic Crate',
    category: 'Crates',
    price: 4.99,
    description: 'Guaranteed Epic-tier cosmetic or kit item on every open.',
    color: '#9b6bff',
  },
  {
    id: 'key-epic',
    name: 'Epic Crate Key',
    category: 'Keys',
    price: 1.99,
    description: 'Opens one Epic Crate. Stackable, tradeable in-game.',
    color: '#9b6bff',
  },
  {
    id: 'kit-assassin',
    name: 'Assassin Kit',
    category: 'Kits',
    price: 6.99,
    description: 'Fast, low-armor, high-mobility loadout built for hit-and-run plays.',
    color: '#4ade80',
  },
  {
    id: 'coins-5000',
    name: '5,000 Coins',
    category: 'Coins',
    price: 4.99,
    description: 'In-game currency for the coin shop, cosmetics, and streak crates.',
    color: '#ffd54a',
  },
  {
    id: 'cosmetic-void-trail',
    name: 'Void Trail Effect',
    category: 'Cosmetics',
    price: 3.99,
    description: 'A drifting particle trail that follows you across every arena.',
    color: '#5cc9ff',
  },
  {
    id: 'bundle-season9',
    name: 'Season 9 Bundle',
    category: 'Bundles',
    price: 19.99,
    originalPrice: 34.97,
    description: 'Assassin Kit + Epic Crate x3 + 2,000 Coins, bundled at a discount.',
    color: '#ff5c5c',
  },
]

export const storeCategories = ['All', 'Ranks', 'Crates', 'Keys', 'Kits', 'Coins', 'Cosmetics', 'Bundles'] as const

export const currentUser = {
  username: 'ashen_wolf',
  rank: 'Warbringer',
  coins: 3420,
  joined: 'Feb 2025',
  avatar: 'A',
  kills: 4821,
  deaths: 3012,
  kd: 1.6,
}

export const inventory = [
  { id: 1, name: 'Void Trail Effect', type: 'Cosmetic', equipped: true },
  { id: 2, name: 'Assassin Kit', type: 'Kit', equipped: false },
  { id: 3, name: 'Epic Crate Key x2', type: 'Key', equipped: false },
  { id: 4, name: 'Warbringer Nametag', type: 'Cosmetic', equipped: true },
]

export const recentActivity = [
  { id: 1, text: 'Opened an Epic Crate — received Void Trail Effect', time: '2h ago' },
  { id: 2, text: 'Voted on Minecraft-MP (+250 Coins)', time: '5h ago' },
  { id: 3, text: 'Purchased Assassin Kit', time: '1d ago' },
  { id: 4, text: 'Redeemed code SEASON9LAUNCH', time: '3d ago' },
]

export const dailyRewards = [
  { day: 1, reward: '100 Coins', claimed: true },
  { day: 2, reward: '150 Coins', claimed: true },
  { day: 3, reward: 'Common Crate Key', claimed: true },
  { day: 4, reward: '200 Coins', claimed: false },
  { day: 5, reward: '250 Coins', claimed: false },
  { day: 6, reward: 'Rare Crate Key', claimed: false },
  { day: 7, reward: 'Streak Crate', claimed: false },
]
