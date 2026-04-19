
// step 1: import mongoose
import mongoose from "mongoose";    



// Mini Model banana hoga, for OrderItemSchema 

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, // Type is ObjectId
        ref: "Product", // Reference to the Product model
    },
    quantity: {
        type: Number, // Type is Number
        required: true, // This field is required
    },

}, {timestamps: true});


// Step 2: Create a schema for Product
const orderSchema = new mongoose.Schema({

    // order ka price to hoga hi
    orderPrice: {
        type: Number,
        required: true, // This field is required
    },

    // customer ka naam bhi hoga
    customerName: {
        type: mongoose.Schema.Types.ObjectId, // Type is ObjectId
        ref: "User", // Reference to the User model
    } ,
    orderItems: {
        // Mini model ka use kr liye
        type: [orderItemSchema], 
    },

    address: {
        type: String, // Type is String
        required: true, // This field is required
    },
    // status field bhi hoga, order ka
    status: {
        type: String, // Type is String
        // Enum ka use krke, 4 option de diye hain
        enum: ["pending", "shipped", "delivered", "cancelled"], // Enum for order status
        default: "pending", // Default value is 'pending'
    },

}, {timestamps: true});


// Step 3: Export the Order model
export const Order = mongoose.model("Order", orderSchema);