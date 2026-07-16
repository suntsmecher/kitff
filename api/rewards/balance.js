const { getBalance } = require("../../lib/db");

// Called by your app/game client to display the user's current
// reward balance, e.g. GET /api/rewards/balance?user_id=abc123
module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const userId = req.query.user_id;
  if (!userId) {
    res.status(400).json({ error: "Missing user_id" });
    return;
  }

  const balance = await getBalance(userId);
  res.status(200).json({ user_id: userId, balance });
};
