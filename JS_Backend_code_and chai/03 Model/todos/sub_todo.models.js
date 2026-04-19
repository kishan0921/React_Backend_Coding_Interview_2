
// step 1: import mongoose
import mongoose from "mongoose";


// Step 2: Create a schema for SubTodo

const subTodoSchema = new mongoose.Schema({
    // content field for subTodo
    content: {
        type: String,
        required: true, // This field is required
    },
    completed: {
        type: Boolean,
        default: false, // Default value is false
    },

    // new kya track krna chahoge subTodo ke liye
    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model name
        required: true, // This field is required
    }

} , {timestamps: true });



// Step 3: Export the SubTodo model
// Mongoose automatically pluralizes the model name
// Example: 'SubTodo' becomes 'subtodos' in the database collection name
export const SubTodo = mongoose.model("SubTodo", subTodoSchema);