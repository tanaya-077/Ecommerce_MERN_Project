const User = require("../../models/User"); // A User model
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For token generation

// REGISTER
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Validate input
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        sucess: false,
        message: "User already exists with same email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User dosen't Exits " });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET, // this in your .env file
      { expiresIn: "1h" }
    );

    // Send JWT as HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        // maxAge: 60 * 60 * 1000 // 1 hour
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGOUT (optional - frontend usually handles it by removing token)
const logoutUser = async (req, res) => {
  try {
    // In stateless JWT auth, logout is handled client-side by deleting token
    res.clearCookie("token", { httpOnly: true, secure: false }).json({ message: "Logout successful" });
     // secure should be true in production
     // res.clearCookie("token", { httpOnly: true, secure: true });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//auth middleware

const authMiddleware = (req, res, next) => { 
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
        return res.status(401).json({ success : false ,message: "Unauthorized User" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
       res.status(401).json({ success: false, message: "Invalid token" }); 
    }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};
