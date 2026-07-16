const { kv } = require("@vercel/kv");

const BALANCE_PREFIX = "balance:";
const TXN_PREFIX = "txn:"; // used to prevent replaying the same reward twice
const TXN_TTL_SECONDS = 60 * 60 * 24 * 30; // keep replay records for 30 days

async function getBalance(userId) {
  const value = await kv.get(BALANCE_PREFIX + userId);
  return value ? Number(value) : 0;
}

async function creditReward(userId, amount) {
  return kv.incrby(BALANCE_PREFIX + userId, amount);
}

// Returns true if this transaction_id has already been redeemed.
async function isDuplicateTransaction(transactionId) {
  const exists = await kv.get(TXN_PREFIX + transactionId);
  return Boolean(exists);
}

async function markTransactionUsed(transactionId) {
  await kv.set(TXN_PREFIX + transactionId, "1", { ex: TXN_TTL_SECONDS });
}

module.exports = {
  getBalance,
  creditReward,
  isDuplicateTransaction,
  markTransactionUsed,
};
