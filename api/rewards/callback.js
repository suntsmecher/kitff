const { verifyAdMobSignature } = require("../../lib/verifyAdMobSignature");

const {
  creditReward,
  isDuplicateTransaction,
  markTransactionUsed,
} = require("../../lib/db");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const fullUrl = `https://${req.headers.host}${req.url}`;

    const { valid, reason } = await verifyAdMobSignature(fullUrl);

    if (!valid) {
      console.warn(reason);
      return res.status(400).send("Invalid signature");
    }

    const userId = req.query.user_id;
    const transactionId = req.query.transaction_id;
    const rewardAmount = Number(req.query.reward_amount);
    const rewardItem = req.query.reward_item ?? "Coins";

    if (!userId || !transactionId || Number.isNaN(rewardAmount)) {
      return res.status(400).send("Missing parameters");
    }

    if (await isDuplicateTransaction(transactionId)) {
      return res.status(200).send("Already credited");
    }

    await creditReward(userId, rewardAmount);

    await markTransactionUsed(
      transactionId,
      userId,
      rewardAmount,
      rewardItem
    );

    console.log(
      `[AdMob] ${rewardAmount} coins -> ${userId} (${transactionId})`
    );

    return res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};