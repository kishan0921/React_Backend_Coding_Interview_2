// Aap auth ka middleware create kroge
//isStudent ka middleware create kroge
//isInstructor ka middleware create kroge
//isAdmin ka middleware create kroge


// Note : Jo purana middleware pehle dekhe the 
// exaclty same hai ...kuch new nahi 
 

// STEP : 01
//ab hume jo bhi aditional package need hai, ussko le kete hai.
// jwt token ki need parne waali hai.
const jwt = require("jsonwebtoken");
// dotenv ki bhi need padegi
require("dotenv").config();
//hume user ki need paadegi
const User = require("../models/User");

 
// STEP : 02 Chaloab auth waali chize fata fat se start krte hai.
// 1.auth
//Chalo auth handler function start krte hai
// async ke ander humhare pass hai, request , response and 
// next - taaki hum next midddle ware ke pass jaa skke.
exports.auth = async (req, res, next) => {
// now ab hum fata fat se iss middle wire ka code krna start kr diya.
    // ye raha mera try block 
    try {
        // STEP : 03
        // AB koi bata skte hai yaha hum ky krte the ?
        // Auth block ke ander aap authentication check krte the,
        // authentication kaise check hoti thi.?
        //aap json web token verify krte the.
        // aap json web token send krte the, and verify krte the,ki
        // token sahi hai ya galat, hume token sahi milta tha to thik ni to hum bhaga dete the.

        // Ab token milne ke 3 tarike humne aapko sikhaye the?
        // 01 aap token extract kr skte ho, cookiee me se
        // 02 body me se, and  (ye method avoid krna hai)
        // 03 bearer token me se  (Best tarika)

        // and kon sa tarika hume jaada avoid krna hai (method 02)


        // STEP :03.1
        //to hume extract kiya token
        // ya to "req.cookies.token" yaha se milega nahi to "req.body.token"
        // yaha se milega.
        // fir "req.header" me 'Authorization' likha hua milega key me.
        // then issko hum replace kr denge.("Bearer ","") "Bearer and space ko replace kr denge empty string se to 
        // hume token mil jaayega."
        const token = req.cookies.token 
                    || req.body.token 
                    || req.header("Authorization").replace("Bearer ","");
        
        // STEP : 03.2
        // maine bola if token is missing, then return response
        if(!token){
            return res.status(401).json({
                //success false kr diye
                success:false,
                // and message show kr diye
                message:`Token Missing`,
            });
        }

        // STEP :03.3
        // ab agla kaam h, humara verify the token - kaise? 
        // Using verify method JWT_secret key and ye mujhe .env file se mil jaayegi.
        // hume verify krna hai, to humne ek try-catch block bana diya.
        try{
            // verify() method ka hume use krte the, 
            // and ussme hum tokeen pass krte hai and JWT_Secreate ko decode krke verify krte hai.
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // now decode code print kr dete hai
            console.log(decode);
        }// lets day kuch problme hota hai to error message show kr dete hai
        catch (error) {
            return res.status(401).json({
                //success false kr diye
                success:false,
                // and message show kr diye
                message:`Token is Invalid`,
            });
        }

        // STEP :03.4
        // then hum next middle ware pe chale jaayenge
        next();


    }catch(error){
        return res.status(401).json({
            //success false kr diye
            success:false,
            // and message show kr diye
            message:`Something went wrong while validating the token`,
        });
    }
}


// STEP : 04
// AB chalte h humari next middle ware ke upar.

// 2. isStudent 
//isStudent naam se humne apna ek middleware start kr diya hai.
// chalo isStudent handler function start krte hai

exports.isStudent = async (req, res, next) => {

    try{

        // 1st tarika hai,  (1st Method)
        // res ke ander jo role add kiya hu(Auth.js me) during login/authentication
        // yaha pe  during 3.Login step (Auth.js)
        // const payload = {
        //     // payload ke ander user ka email, id, role pada hai
        //     email:user.email,
        //     id:user._id,
        //     role:user.accountType,
        // };
        // Iss payload ke ander Role pada hai

        // and Jab maine upper  decode kiya to 
        // const decode = jwt.verify(token, process.env.JWT_SECRET);
        //     // now decode code print kr dete hai
        //     console.log(decode);
        // yaha console.log me decode me role bhi print hoga to waaha se le skte hai
        // and hum isStudent me  uss role ko find out kr skte hai
        // jaise last time use kiya tha humne Authentication and Authorization waali video me (same ussi tarike se)


        // 2nd tarika hai,  (2nd Method) jo hum use krne waale hai
        // Kuch new try krte hai
        // Chalo logic write down krte hai
        // 2nd method - Kuch nahi Db me se Data nikal lo, Db me Account_type hoga wo nikal lo
        // Chalo 1st method hi use krte hai...kyuki data pehle se hi pada hai to use krte h usse


        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                //success mili nahi hai
                success:false,
                // and message show kr diye
                message:`This is a Protected Route for Students only`,
            });
        }

        next();

    }catch(error){
        return res.status(401).json({
            //success mili nahi hai
            success:false,
            // and message show kr diye
            message:`User Role Can't be Verified,please try again`,
        });

    }
}


// 3.IsInstructor
// same copy code as isStudent
exports.isInstructor = async (req, res, next) => {

    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                //success mili nahi hai
                success:false,
                // and message show kr diye
                message:`This is a Protected Route for Instructor only`,
            });
        }

        next();

    }catch(error){
        return res.status(401).json({
            //success mili nahi hai
            success:false,
            // and message show kr diye
            message:`User Role Can't be Verified,please try again`,
        });

    }
}


// 4.isAdmin
// same copy code as isStudent
exports.isAdmin = async (req, res, next) => {

    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                //success mili nahi hai
                success:false,
                // and message show kr diye
                message:`This is a Protected Route for Admin only`,
            });
        }

        next();

    }catch(error){
        return res.status(401).json({
            //success mili nahi hai
            success:false,
            // and message show kr diye
            message:`User Role Can't be Verified,please try again`,
        });

    }
}

