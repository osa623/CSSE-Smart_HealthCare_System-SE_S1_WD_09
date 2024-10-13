const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentNo: {
    type: String,
    required: true,
    unique: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  charge: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  scheduledTime: {
    type: String,
    required: true,
  },
  seatNo: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
