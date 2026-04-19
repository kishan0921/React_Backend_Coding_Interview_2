
// Step : 1 Sabse pehle mongoose import kar lo 
import mongoose from "mongoose";


// Note: Mongoose help krta hai aapko schema banane me
// Step : 2 Schema banalo
// 'New' keyword se using mongoose then mongoose ke ander ek method 
// Milta hai Schema jo ki ek object leta hai
// new mongoose.Schema({}) 
// then Isse hum ek variable me store kar lenge
// and object ke ander hum data rahkte hai, key value ke format me
const userSchema = new mongoose.Schema(
    {
        // yaha Username field hai
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        // Next email field hai
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: 
        // Ye niche ho hai, wo password ka fields hai
        {
            type: String,
            required: true,
        },

    }, {timestamps: true} // Ye timestamps option hai, jo createdAt and updatedAt fields ko automatically add karta hai
)


// Step 03: Export kar do, mongoose ka schema ,not userSchema ye waala const
// 03.1 - export kr do ek User Model
// export const User
// 03.2 - then using mongoose , mai bol raha hu ek model bana do
// export const User = mongoose.model();
// 03.3 - then isme do cheezein pass karni hoti hain
// 03.3.1 - pehla, kya model banau (like 'User')
// 03.3.2 - dusra, Kiske Base pe (like 'userSchema')
export const User = mongoose.model("User", userSchema);

// Interview : Jab bhi Db ke jab schema banta hai to 
// 'User' convert ho jata hai 'users' me
// Note: Mongoose automatically pluralizes the model name
// Example: 'User' becomes 'users' in the database collection name











