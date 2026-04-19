
// step 1: import mongoose
import mongoose from "mongoose";



// step 02: Create a schema for MedicalRecord
const medicalRecordSchema = new mongoose.Schema({}, {timestamps: true});


// Step 03: Export the MedicalRecord model
export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);