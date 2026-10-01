const express = require("express");
const router = express.Router();

const Log = require("../models/Log"); // adjust path as needed
const User = require("../models/User"); // adjust path as needed

const { verifyToken } = require("../security/auth");
const { authorizeRoles } = require("../middlewares/role.middleware");

router.get("/", verifyToken, authorizeRoles("Admin"), async (req, res) => {
  try {
    const logs = await Log.find({}).populate({
      path: "userId",
      select: "username role",
      populate: {
        path: "role",
        select: "name",
      },
    });

    const formattedLogs = logs.map((log) => ({
      _id: log._id,
      action: log.action,
      ipAddress: log.ipAddress,
      method: log.method,
      path: log.path,
      requestBody: log.requestBody,
      statusCode: log.statusCode,
      targetId: log.targetId,
      targetName: log.affectedName || "N/A",
      targetType: log.targetType,
      timestamp: log.timestamp,
      userId: log.userId ? log.userId._id : null,
      username: log.userId ? log.userId.username : "N/A",
      role: log.userId && log.userId.role ? log.userId.role.name : "N/A",
    }));

    res.json({ success: true, data: formattedLogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
