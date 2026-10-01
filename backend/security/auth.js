const jwt = require("jsonwebtoken");
const secretkey = "phyvauac.lk@2024";
const User = require("../models/User");

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    console.log("TOKEN", token);
    if (!token) {
      return res.status(403).send("Token not available");
    }
    // token = token.includes("Bearer") ? token.sp
    // lit(" ")[1] : token;
    jwt.verify(token, secretkey, async (err, decoded) => {
      console.log("REQUEST", decoded);
      req.userId = decoded.userId;
      //console.log(req.userId);
      const user = await User.findById(req.userId).populate("role");
      console.log("auth", user);
      if (!user) return res.status(404).json({ message: "User not found" });
      req.user = user;
      if (err) {
        return res.status(401).json({ error_message: "Invalid token" });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
}
module.exports = { verifyToken };
