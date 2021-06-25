const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false}));

app.get("/", (req, res) => res.send("api running"));


app.use('/auth', require('./routes/auth'))
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
