const express = require("express");
const router = express.Router();
const { verifyToken } = require("../security/auth");
const { authorizeRoles } = require("../middlewares/role.middleware");
const logger = require("../middlewares/logger.middleware");
const Log = require("../models/Log");

//Only admin can access this route
router.get(
  "/admin",
  verifyToken,
  authorizeRoles("Admin"),
  logger("access_admin_route", "Route"),
  async (req, res) => {
    res.json({ message: "Welcome Admin", success: true });
  }
);

//Both admin and manager can access this route
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("Admin", "Manager"),
  logger("access_manager_route", "Route"),
  async (req, res) => {
    // await Log.create({
    //   userId: req.user.userId,
    //   action: "access_admin_route",
    //   targetType: "Route",
    //   ipAddress: req.ip,
    //   details: "Accessed /admin route",
    // });
    res.json({ message: "Welcome Manager", success: true });
  }
);

//All can access this route
router.get(
  "/user",
  verifyToken,
  authorizeRoles("Admin", "Manager", "User"),
  logger("access_user_route", "Route"),
  async (req, res) => {
    res.json({ message: "Welcome User", success: true });
  }
);

module.exports = router;
