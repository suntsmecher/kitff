const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", userId)
    .single();

  if (error) throw error;
  return data;
}

async function getBalance(userId) {
  const profile = await getProfile(userId);

  const { data, error } = await supabase
    .from("balances")
    .select("coins")
    .eq("user_id", profile.id)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  return data?.coins ?? 0;
}

async function creditReward(userId, amount) {
  const profile = await getProfile(userId);

  const { data: balance } = await supabase
    .from("balances")
    .select("coins")
    .eq("user_id", profile.id)
    .single();

  const current = balance?.coins ?? 0;

  const { error } = await supabase
    .from("balances")
    .upsert({
      user_id: profile.id,
      coins: current + Number(amount),
    });

  if (error) throw error;

  return current + Number(amount);
}

async function isDuplicateTransaction(transactionId) {
  const { data } = await supabase
    .from("analytics_events")
    .select("id")
    .eq("event_type", "reward")
    .eq("metadata->>transaction_id", transactionId)
    .maybeSingle();

  return !!data;
}

async function markTransactionUsed(
  transactionId,
  userId,
  rewardAmount,
  rewardItem
) {
  const profile = await getProfile(userId);

  const { error } = await supabase
    .from("analytics_events")
    .insert({
      user_id: profile.id,
      event_type: "reward",
      metadata: {
        transaction_id: transactionId,
        reward_amount: rewardAmount,
        reward_item: rewardItem,
      },
    });

  if (error) throw error;
}

module.exports = {
  getBalance,
  creditReward,
  isDuplicateTransaction,
  markTransactionUsed,
};