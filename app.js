const express = require("express");
const dotenv = require("dotenv");
const schoolRoutes = require("./routes/schoolRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", schoolRoutes);

app.get("/", (req, res) => {
  res.send("School Management API is running!");
});


const PORT = process.env.PORT || 5010;
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_USER =", process.env.DB_PASSWORD);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});