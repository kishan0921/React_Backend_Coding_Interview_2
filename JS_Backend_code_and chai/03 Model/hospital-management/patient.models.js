
// step 1: import mongoose
import mongoose from "mongoose";

// Step 2: Create a schema for Patient
const patientSchema = new mongoose.Schema({

    // name to hoga patient ka
    name: {
        type: String,
        required: true, // This field is required
    },

    // dignosed with
    diagnosedWith: {
        type: String,
        required: true, // This field is required
    },

    // User/patient ka address hoga
    address: {
        type: String,
        required: true, // This field is required
    },
    // age of the patient
    age: {
        type: Number,   // Type is Number   
        required: true, // This field is required
    },

    // Blood group of the patient
    bloodGroup: {
        type: String,   // Type is String
        required: true, // This field is required
    },

    // gender of the patient    
    gender: {
        type: String,   // Type is String
        enum : ['M','F','O'],
        required: true, // This field is required
    },
    // User kis hospital me admit hai , to reference dena hoga
    addmittedTo: {
        type: mongoose.Schema.Types.ObjectId, // Type is ObjectId
        ref: "Hospital", // Reference to the Hospital model
        required: true, // This field is required
    },

}, {timestamps: true});


// Step 3: Export the Patient model
export const Patient = mongoose.model("Patient", patientSchema);