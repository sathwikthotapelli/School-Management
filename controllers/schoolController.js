const db = require("../config/db");
const getDistance = require("../utils/distanceCalculator");

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: "School added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "User's latitude and longitude required" });
  }

  try {
    const [schools] = await db.execute("SELECT * FROM schools");

    const sortedSchools = schools.map(school => {
      const distance = getDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  } catch (err) {
    res.status(500).json({ error: "Error fetching schools", details: err });
  }
};