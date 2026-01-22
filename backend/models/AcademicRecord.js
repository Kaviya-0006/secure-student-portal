const mongoose = require("mongoose");

const academicRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  semester: { type: Number, required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true },
  attendance: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model("AcademicRecord", academicRecordSchema);
