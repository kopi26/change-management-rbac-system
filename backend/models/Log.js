const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  action: { type: String, required: true }, // e.g., "create_employee"
  targetType: { type: String }, // e.g., "Employee"
  targetId: { type: mongoose.Schema.Types.ObjectId }, // Affected doc's ID
  targetName: { type: String }, // Affected doc's name (e.g., "Chamila")
  ipAddress: { type: String },
  statusCode: { type: Number },
  method: { type: String },
  path: { type: String },
  requestBody: { type: Object }, // Original request body (optional)
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", logSchema);
