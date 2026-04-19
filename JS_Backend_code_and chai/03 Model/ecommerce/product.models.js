// Note: jab field banate hain, to order matter nahi krta
// 

//Step : 01 import mongoose 
import mongoose from "mongoose";


// Step 02: Create a schema for Product
const productSchema = new mongoose.Schema({
    
    // product ka description to hoga hi
    description: {
        type: String,
        required: true, // This field is required
    },

    // name to laagega hi, product ka
    name: {
        type: String,
        required: true, // This field is required
    },

    // product ka image bhi hoga
    productImage: {
        type: String,
    },

    // price bhi hoga product ka, to chalo price field  banate h
    price: {
        type: Number,   
       default: 0, // Default value is 0 (means default price is 0)
    },

    // stock bhi hoga product ka, to stock field banate h
    stock: {
        default: 0, // Default value is 0 (means default stock is 0)
        type: Number,
    },

    // category bhi hoga product ka, to category field banate h
    category: {
        // type kya hoga, mongoose se aayga,
        // mongoose mujhe schema dena,schema ke ander mujhe types chahiye and objectId
        type: mongoose.Schema.Types.ObjectId, // Type is ObjectId
        
        // Upper jaise maine type as objectId diya hai, to mujhe ref bhi dena padega
        ref: "Category", // Reference to the Category model
        required: true, // This field is required
    },

    owner: {
        // type kya hoga, mongoose se aayga,
        // mongoose mujhe schema dena,schema ke ander mujhe types chahiye and objectId
        type: mongoose.Schema.Types.ObjectId, // Type is ObjectId
        
        // Upper jaise maine type as objectId diya hai, to mujhe ref bhi dena padega
        ref: "User", // Reference to the User model
        required: true, // This field is required
    }
}, {timestamps: true});



// Step 03; Export the Product model
export const Product = mongoose.model("Product", productSchema);
// Mongoose automatically pluralizes the model name
// Example: 'Product' becomes 'products' in the database collection name
// agar products likha hota to , products me convert ho jata