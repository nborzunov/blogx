const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
var multer = require("multer");

var upload = multer();
const app = express();

app.use(cors());

connectDB();

app.use(express.json({ extended: false, limit: "5000kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/post", require("./routes/post"));
app.use("/search", require("./routes/search"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
