const mongoose = require("mongoose");

// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
    doctorId: {
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
    time: {
        type: String,
        required: true,
    },
    seatCount: {
        type: [Number],
        required: true,
    },
    
    pricePerSchedule: {
        type: Number,
        required: true,
    }

});

// Create the Doctor model
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
