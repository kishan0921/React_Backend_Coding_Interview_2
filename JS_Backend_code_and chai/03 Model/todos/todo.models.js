
// Step 01: Import mongoose
import mongoose from "mongoose";


// Step 02: Create a schema for Todo
// and timestamps option use hota hai inplace of  createdAt and updatedAt
// Becasue mongoose schema define hone ke baad, createdAt and updatedAt
// Maangta hai so, hum timestamps as 2nd option use karte hain
const todoSchema = new mongoose.Schema({

    // content field hai
    content: {
        type: String,
        required: true,

    },
    completed: {
        type: Boolean,
        default: false, // Default value is false
    },

    createdBy: {
        // ye type aise hi likha jaata hai, and jab bhi monngooose 
        // ye type dikhta hai, to wo smjh jaata hai ab koi dusra model ka reference milega
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //here, "User" jo name hai, wo hmesha model creaate krte time 1st name jo dalte h wohi rahega" 
        // Reference to the User model
        required: true, // This field is required
    },
    // subTodos field hai, jo SubTodo model ka reference hai
    subTodos: [{
        // hume dusre model ka reference lena hai, to type and ref pass kr do
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo", // Reference to the SubTodo model
    }] // Array of SubTodo 

}, {timestamps: true });


export const Todo = mongoose.model("Todo", todoSchema); 
// Database me jab Todo add hoga to wo 'todos' me convert ho jayega
// Mongoose automatically pluralizes the model name
// Example: 'Todo' becomes 'todos' in the database collection name