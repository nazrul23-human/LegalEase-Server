const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

//GET LOGGED USER
router.get("/me", verifyToken, (req, res) => {
    res.json({ user: req.user });
});

//UPDATE PROFILE (REAL DB UPDATE)
router.put("/update", verifyToken, async (req, res) => {
    try {
        const { name, avatar } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, avatar },
            { new: true }
        );

        res.json({
            message: "Profile updated",
            user: updatedUser
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put("/admin/approve/:id", verifyToken, requireRole("admin"), async (req, res) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isApproved: true },
        { new: true }
    );

    res.json({ message: "Lawyer approved", user });
});
//ONLY APPROVED LAWYERS
router.get("/lawyers", async (req, res) => {

    try {
        const lawyers = await User.find({
            role: "lawyer",
            isApproved: true
        });

        res.json({ lawyers });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;