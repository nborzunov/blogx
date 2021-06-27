const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

app.use(cors());

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("api running"));

app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
