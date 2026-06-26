const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB CONNECT
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected."))
    .catch((err) => console.log("MongoDB Error:", err));


const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);


// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Nazrul, Server Running.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});