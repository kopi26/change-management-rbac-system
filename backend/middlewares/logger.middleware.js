const Log = require("../models/Log");

const logger = (action, targetType, targetNameKey = null) => {
  return async (req, res, next) => {
    res.on("finish", async () => {
      if (!req.user) return;
      console.log("LOGS", req.body.name);
      const logDetails = {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        requestBody: req.body,
      };

      // Include name or identifier of affected target if available
      if (req.body && req.body.name) {
        targetNameKey = req.body.name;
      }
      const log = new Log({
        userId: req.user._id,
        action,
        targetType,
        targetId: req.params.id || null,
        ipAddress: req.ip,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        requestBody: req.body,
        targetName: targetNameKey,
      });

      try {
        await log.save();
        console.log("Log SAVE", log);
      } catch (err) {
        console.error("Failed to save log:", err.message);
      }
    });

    next();
  };
};

module.exports = logger;
