
// step 1: import mongoose
import mongoose from "mongoose";    


// step 02: Create a schema for Doctor
const doctorSchema = new mongoose.Schema({
    // doctor ka name
    name: {
        type: String,
        required: true, // This field is required
    },

    // doctor ka salary
    salary: {
        type: Number,   // Type is Number
        required: true, // This field is required
    },

    // qualification of the doctor
    qualification: {
        type: String,   // Type is String
        required: true, // This field is required
    },

    // Experience of the doctor in years
    experience: {
        type: Number,   // Type is Number
        default: 0, // Default value is 0
    },

    // ab doctor jo h, different hospital me work krte hai
    worksInHospital: {
        type: mongoose.Schema.Types.ObjectId, // Type is ObjectId
        ref: "Hospital", // Reference to the Hospital model
        required: true, // This field is required
    },
}, {timestamps: true});


// Step 03: Export the Doctor model
export const Doctor = mongoose.model("Doctor", doctorSchema);