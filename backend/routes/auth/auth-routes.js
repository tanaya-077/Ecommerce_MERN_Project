const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user; // User info is attached by authMiddleware
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  res.status(200).json({ success: true, user: req.user , message: "User authenticated successfully" });
});

module.exports = router;
