
// Import mongoose
import mongoose from "mongoose";



// Step 02: Create a schema for Category
// Schema , do chiz lega (Schema and timestamps)
const categorySchema = new mongoose.Schema({
    // Name field for category
    name: {
        type: String,
        required: true, // This field is required
    },
    
}, {timestamps: true}) // Timestamps option for createdAt and updatedAt


// Step 03: Export the Category model

export const Category = mongoose.model("Category", categorySchema);