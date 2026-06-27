const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/me", verifyToken, (req, res) => {
    res.json({
        user: req.user
    });
});
router.get("/admin/users", verifyToken, requireRole("admin"), async (req, res) => {
    const users = await User.find();
    res.json({ users });
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
router.get("/lawyers", async (req, res) => {
    try {
        const lawyers = await User.find({ role: "lawyer" });

        res.json({
            lawyers
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;