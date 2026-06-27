const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

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
router.post("/upload", upload.single("image"), (req, res) => {
    res.json({
        imageUrl: req.file.path
    });
});
router.delete(
    "/admin/user/:id",
    verifyToken,
    requireRole("admin"),
    async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.json({
                message: "User deleted successfully"
            });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports = router;