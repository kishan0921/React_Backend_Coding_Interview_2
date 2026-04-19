
// Step 01: Import mongoose
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    // Ab niche schema pe chalte h, like User ka schema me kya kya fields honge
    // rahkna chahte hai

    // Ye niche username field hai
    // and ye username ki properties hai
    username: {
        // Ye niche username ki properties hai
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Lower case rahkna , acchi preatice hai
    },

    email:{
        // Niche email ki properties hai 
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Lower case rahkna , acchi preatice hai
    },
    password: {
        // Ye niche password ki properties hai
        type: String,
        required: true, // Ye field required hai
    }
},{timestamps: true})
 // here timestamps, take two fields createdAt and updatedAt


// Step 03: export the User model
export const User = mondoose.model("User", userSchema);