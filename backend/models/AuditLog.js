const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: ["student", "faculty"], required: true },
  action: { type: String, required: true },
  targetStudentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String }
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
