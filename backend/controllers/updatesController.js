const { generateGovernmentUpdates } = require("../services/updatesService");

async function getGovernmentUpdates(req, res) {
  try {
    const updates = await generateGovernmentUpdates();
    res.json(updates);
  } catch (error) {
    console.error("Controller Error - getGovernmentUpdates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getGovernmentUpdates,
};
