const { verifyAdMobSignature } = require("../../lib/verifyAdMobSignature");
const {
  creditReward,
  isDuplicateTransaction,
  markTransactionUsed,
} = require("../../lib/db");

// This is the URL you configure in the AdMob UI as your
// "Server-side verification callback URL", e.g.
//   https://kitffa.vercel.app/api/rewards/callback
//
// AdMob calls this URL (as a GET request) after a user finishes
// watching a rewarded ad. We must:
//   1. Verify the request really came from AdMob (signature check)
//   2. Make sure we haven't already paid out this exact transaction
//   3. Credit the user's balance
module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send("Method not allowed");
    return;
  }

  const fullUrl = `https://${req.headers.host}${req.url}`;

  const { valid, reason } = await verifyAdMobSignature(fullUrl);
  if (!valid) {
    console.warn("Rejected AdMob SSV callback:", reason);
    res.status(400).send("Invalid signature");
    return;
  }

  const userId = req.query.user_id;
  const transactionId = req.query.transaction_id;
  const rewardAmount = Number(req.query.reward_amount);
  const rewardItem = req.query.reward_item;

  if (!userId || !transactionId || Number.isNaN(rewardAmount)) {
    res.status(400).send("Missing required params");
    return;
  }

  const alreadyUsed = await isDuplicateTransaction(transactionId);
  if (alreadyUsed) {
    // Not an error -- AdMob may retry callbacks. Acknowledge success
    // without crediting twice.
    res.status(200).send("OK (duplicate, ignored)");
    return;
  }

  await creditReward(userId, rewardAmount);
  await markTransactionUsed(transactionId);

  console.log(
    `Credited ${rewardAmount} ${rewardItem} to user ${userId} (txn ${transactionId})`
  );

  res.status(200).send("OK");
};
