const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(" Nazrul, Server Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server running non port", PORT);
});