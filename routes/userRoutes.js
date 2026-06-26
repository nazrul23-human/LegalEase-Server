const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/me", verifyToken, (req, res) => {
    res.json({
        user: req.user
    });
});

router.post("/upload", verifyToken, async (req, res) => {

    try {
        res.json({
            message: "Upload route ready"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;