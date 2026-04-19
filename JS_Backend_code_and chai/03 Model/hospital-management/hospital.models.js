// step 1: import mongoose      
import mongoose from "mongoose";


// Step 2: Create a schema for Hospital
const hospitalSchema = new mongoose.Schema({
    // hospital ka name
    name: {
        type: String,
        required: true, // This field is required
    },

    // hospital ka address
    addressLine1: {
        type: String,
        required: true, // This field is required
    },

    addressLine2: {
        type: String,
        required: true, // This field is required
    },

    // pin code for the hospital
    pinCode: {
        type: String,   
        required: true, // This field is required
    },

    // hospital , kis type ka hai
    specializedIn: {
        type: String,   // Type is String
        required: true, // This field is required
    },  
}, {timestamps: true});


// Step 3: Export the Hospital model
export const Hospital = mongoose.model("Hospital", hospitalSchema);