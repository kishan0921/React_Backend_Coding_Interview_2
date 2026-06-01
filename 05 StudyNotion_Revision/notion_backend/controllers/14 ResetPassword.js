
// reset password kr ne liye mujhe email pe ek link bhejna hoga 
// to maine resetPasswordToken - isska work hai mail send krne ka 
//resetPassword - Db me password update krne ka kaam ye krega


// STEP :01
// now kis kis model ki need padni waali hai
// User ke saath ko hum interact kr hi rahe h, to user to utha hi lo
const User = require("../models/User");
// Mujhe mailsender ka bhi use krna hai...and isski need padne waali hai
const mailSender = require("../utils/mailSender");




// STEP :02 
// Ab humne yaha pe ek async function bana liya.
// resetPasswordToken 
exports.resetPasswordToken = async (req, res) => {
    // steps :
    //1. password chnage krne aaye ho to , Input me email diya hoga (get email from req body)
    //2. Check user for this email, and let say email validation krna chahte hai
    // 3. Link generate krna chahte hai token ka (Generate Token)
    // 4.update user by adding token and expiration time
    // 5.Then Url Create 
    // 6.Send mail containing the (url craeted)
    // 7.return response


    try{
    // STEP : 02.1
    // 1. get email from req body
    // hum email nikal lete hai.
    const {email} = req.body.email;

    // STEP :02.2
    // 2. Check user for this email, and let say email validation krna chahte hai
    // Ab fata fat check kr lo, user kaahi pehle se exist to nhi krta.
    // findOne() method ka use krke hum ye waali "email" se check krenge ki kahi user exist to ni krta.
    const user = await User.findOne({email:email});
    

    // STEP :02.3
    // agar user nahi mila 
    if(!user){
        // to response return kr do.
        return res.status(400).json({
            success:false,
            message:`This Email: ${email} is not Registered With Us Enter a Valid Email `,
        })
    }


    // STEP :02.4
    // 3. Link generate krna chahte hai token ka (Generate Token)
    // Ab hume ek token generate krna hai.
    // to hmne bola crypto. randomUUID() method se ek token generate ho jaeyga.
    const token = crypto.randomUUID();




    // STEP :02.5 
    // 4.update user by adding token and expiration time
    // Upar jo token hume mila hai, ussi token ko hum fata fat se
    // user ke ander hum add kr denge.
        // user ke ander token add krna hai and expirtation time
        const updatedDetails = await User.findOneAndUpdate(
            // Ab kiske base pe search kroge.
            // Maine bola email ke base pe search kr lo.
            // email ke based pe search kr lenge
            {email:email},
            // and change kya kroge?
            // change mujhe ye krna h, 
            // ki token change krna hai, and date add krna h.
            {
                // and change kya krna h, 
                // token change krna hai and date add krna hai
                token:token,
                resetPasswordExpires:Date.now() + 3600000,
            },
            // Yaha new (3rd parameter) ko true mark krte hai to ...... 
            // update document jo hoga wo return hoga response me
            // nahi to old document return hoga

            //in 1line- Updated Document return hota hai, response me
            {new:true} // 3rd parameter
        );



    
    // STEP :02.6
    // 5.Then Url Create 
    // Ab hume apna url create krna hai.
    // Note: Backend : 4000 port and frontend : 3000 port 
    const url=`http://localhost:3000/update-password/${token}`
    // Ab humne ${token} generate krna hoga using crypto package 


    // STEP :02.7 
    // 6.Send mail containing the (url craeted)
    // Ab mujhe mail send krna hai.
    await mailSender(
        // ye send krne ke liye kya kya chahiye email,
        email,
        "Password Reset Link",
        `Password Reset Link: ${url}`);  

    // STEP : 02.8
    // 7.return response
    return res.status(200).json({
        success:true,
        message:`Email Sent Successfully, Please Check Your Email to Continue Further`,
    })
} // STEP :02.9
catch(error){
    return res.status(500).json({
        success:false,
        message:`Some Error in Sending the Reset Message`,
    })
}
}


// STEP :03
//resetPassword
// Ab Hum aate hai,hum apni last async handler function ke uppar.

exports.resetPassword = async (req, res) => {
    try {

        // steps
        // 1.data fetch
        // 2.validation
        // 3.get user details from db using token
        // 4. if no entry - 1st reason-(invalid token)
        // 5. 2nd reason (token ka time expire ho gya hoga) token time check
        // 6. hash password (hmehsa to ye krte hai password ko hash krna)
        // 7. password update (6. ke baad password update krenge)
        // 8. return response


        // STEP :04
        // 1.data fetch
        // const url=`http://localhost:3000/update-password/${token}`
        // yaha hum token url me pass kr rahe hai, but body me se hum token le rahe hai.
        // ye kaise hua?
        // frontend ne daala hai ye token body me.
        // to hum body me se password, confirmPassword and token nikal lenge.
        const {password, confirmPassword, token} = req.body;



        // STEP :05
        // 2.validation - Ab hum apna validation start krenge.
        // check krta hu password and confirm password same hai ya nahi
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:`Password and Confirm Password Does not Match`,
            })
        }

        // STEP :06
        // 3.get user details from db using token
        // AB hume user ki detail, fetch krke laani hai db me se.
        // Kisske aadhar pe laaoge, token ke aadhar pe.
        const userDetails = await User.findOne({token:token});


        // STEP : 07
        //4. if no entry - 1st reason-(invalid token)
        // Agar user ki entry mujhe nhi mili to ?
        // token invalid hai.
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:`Token is Invalid`,
            })
        }


        // STEP :08
        //5. 2nd reason (token ka time expire ho gya hoga) token time check
        // Agar user ki entry mujhe ni mili ? 
        // 2nd reason ho skta hai (token ka time expire ho gya hoga)
        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(400).json({
                success:false,
                message:`Token is Expired, Please Regenerate Your Token`,
            })
        }

        // STEP :09
        //6. hash password (hmehsa to ye krte hai password ko hash krna)
        // Ab hum apna password hash krenge using bcrypt and usske ander hash() method ka use krke.
        const hashedPassword = await bcrypt.hash(password, 10);


        // STEP:10
        //7. password update (6. ke baad password update krenge)
        // Ab mera passwrod hash ho chuka hai ,next step 
        // Password ko update krna bacha hua hai.
        await User.findOneAndUpdate(
            //token ke based pe user dhundh kr laao
            {token:token},
            // and password update kr denna
            {password:hashedPassword},

            // new kon sa docuemnt return krna hai, new waala docuemnt reponse me return hoga.
            {new:true}
        )


        // STEP :11
        //8. return response 
        // sab thik hai to successfull password reset message return kr do.
        return res.status(200).json({
            success:true,
            message:`Password Reset Successful`,
        })

    }

    // STEP 12:
    // Agar kuch problem hua to catch me error send kr do.
    catch(error){
        return res.status(500).json({
            success:false,
            message:`Some Error in Updating the Password`,
        })
    }
}


