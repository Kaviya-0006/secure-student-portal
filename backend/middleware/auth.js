const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (roles = []) => {
  // roles: array of allowed roles
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "No token, access denied" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-passwordHash");

      if (roles.length && !roles.includes(req.user.role))
        return res.status(403).json({ message: "Access forbidden" });

      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = auth;
