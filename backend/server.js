const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// ===== BODY PARSER =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== DATABASE =====
const db = require("./app/models");

console.log("Mongo URL:", db.url);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

// ===== ROUTES =====
require("./app/routes/turorial.routes")(app);

// ===== SERVER START =====
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});