const express = require("express");
const router = express.Router();

const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// USER DASHBOARD
router.get("/user", verifyToken, (req, res) => {
    res.json({
        message: "User Dashboard",
        user: req.user
    });
});

// LAWYER DASHBOARD
router.get("/lawyer", verifyToken, requireRole("lawyer"), (req, res) => {
    res.json({
        message: "Lawyer Dashboard"
    });
});

//ADMIN DASHBOARD
router.get("/admin", verifyToken, requireRole("admin"), (req, res) => {
    res.json({
        message: "Admin Dashboard"
    });
});

module.exports = router;