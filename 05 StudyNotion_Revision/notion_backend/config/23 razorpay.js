
// STEP :01
// Razorpay ka instance create krna hoga
// aapko razorpay ka instance mil gaya.
const Razorpay = require("razorpay");
// Ab aako razorpay ka instance mil gya


// STEP :02
// Ab hum 1 instance create krna chahte hai
exports.instance =  new Razorpay({

    // Isske ander option pass kar rahe hai
    key_id: process.env.RAZORPAY_KEY,  //RAZORPAY_KEY env file se le laayenge
    key_secret: process.env.RAZORPAY_SECRET, //RAZORPAY_SECRET env file se le laayenge
});

//  Razorpay ka config done

// STEP :03
// razorpay ki config add kro .env file me.