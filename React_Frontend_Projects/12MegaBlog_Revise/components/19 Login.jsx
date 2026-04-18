// Note: Login and sigup .jsx dono react form hook 
// pe based hai and same code likha gaya hai dono me ...
// // 1 samjh lo 2nd file easily smjh jaaoge


// STEP : 01
// State bhi chahiye hoga, state bhi manage krna hoga.
// state to change krna hoga , so useState le lete hai
import React, {useState} from 'react'
// login ke baad kahi to bhejoge user ko , 
// Clickable ke liye Link, and Dusri jagah bhejne ke liye useNavigate import krenge kr liye
import {Link, useNavigate} from 'react-router-dom'
// Ab jo humari authSlice hai, ussme se hume logig chahiye hoga.
// ab login import kr rahe hai and , yaaha hm usse as authLogin use krengege.
//Baiscallly, Login ka name change kr diye
import { login as authLogin } from '../store/authSlice'
// Button, input, Logo sab index se import kr liye h
import {Button, Input, Logo} from "./index"

// Now, Auth ki service lagegi and also use Dispatch bhi lena hai
// Dispatch bhi krna hoga , to useDispatch import krenge react-redux se
import {useDispatch} from "react-redux"
// authService bhi lagegi hi , to import krenge
import authService from "../appwrite/auth"

// STEP :02
//Most Important : react-hook-form use krenge and 
// bs ye dekh lo sab samjh aajaayega
// and form ke liye react-hook-form import krenge
import {useForm} from "react-hook-form"


function Login() {
    // STEP : 03
    // sabse pehle navigate to lenge hi 
    const navigate = useNavigate()
    // dispatch bhi le aate hai.
    const dispatch = useDispatch()

    // useForm bhi to laaye ho, to as it is from documentation se le aate h
    // useForm se hum, register and handleSubmit le rahe hai.
    const {register, handleSubmit} = useForm()
    // error display krwane ke liye useState ka use krenge
    // starting me empty state hai isska
    const [error, setError] = useState("")


    //STEP 04:
    // Ab sabse pehle to 1 method banayenge login ka
    // then async function banayenge , kyuki data submit hoga then aayega , and bahut kuch
    // Async hi kyu ? - kyuki infromation submit hogi, wapas aayegi information kaafi kuch hoga time-lagega.
    const login = async(data) => {
        // Now, jab bhi login first time set kro to error ko empty kr do.
        setError("")

        // ab try ke ander hum saara data send krke dekhenge.
        // jo bhi form me fill hoga.
        try {
            //STEP: 05
            // async laaga rakha hai, to await use krna hi hoga.
            // then authService se login method ko call krenge and data ko send krenge
            // and jo response aayega wo aayega ek session.
            const session = await authService.login(data)
            // agar session aaya hai then, then user login hai and nahi aaya hai mtlb
            // user login nahi hai.
            if (session) {
                // agar session hai, to hum user data nikalenge and humesha await se hi nikalta hai.
                //and userdata aap koi session se ni nikal rahe h. aap getCurrentUser() method ko call krke nikal rahe h.
                // authService ke ander getCurrentUser() method hai and issko call kr do
                const userData = await authService.getCurrentUser()
                // agar ab, humare pass userData aaya hai then 
                // dispatch krna hoga, and authlogin ko UserData pass kr diya.
                if(userData) dispatch(authLogin(userData));
                // yaha tak, iss step tk agar user aa gaya h, then 
                // ab mtlb user login hai, then yaha kyu rakhna hai isse,
                // login ho gaya h user, then (/) yaha pe naviagte kr do user ko
                // Ques: Link use ni kiye kyuki ussme click krna hota, navigate directly (/) isspe redirect ho jaayega.
                navigate("/")
            } // STEP : 06
        } catch (error) {
            // agar error aaya to error message show kr denge.
            // ye jo error.message hai ye mai state me save kr liya hu.
            setError(error.message)
        }
    }

  return (
    // STep :07
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {/* STEP : 08  */}
        {/* agar error aayega tabhi && ke baad jo likha hai , show krenge nahi to nahi. */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        
        
        {/* STEP : 09  */}
        {/* // Ab interesting Story start hoti hai yaha se, form ki  */}
        {/* // form ke ander 1 major activity hoti hai, onSubmit
        // and form jab bhi submit hoga then , always handleSubmit() use hoga, and ye ek method hai 
        // and isske ander hum apna method send krte hai, ki iss tarah se hum submit handle krengege. 
        // not yaha handleSubmit ek event hai. */}

        {/* //Note: why we use handleSubmit ?
        - form me jitne bhi input field wagera hum denge,to yaha agar hum register() ka use krte hai,
         krte hai to , automatically form me jitne bhi input field wagera hum denge, usska state manage krne ki zarurate nahi h
         //automatically, from ke saare value register pick krega and without , managing state 
         // apne aap handleSubmit call krte time, saare value wo le lega.  */}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                {/* STEP : 10  */}
                {/* // chalo ek input field banayenge, and self closing hai ye <Input/> */}
                {/* ye input mera jo component hai, usska input hai  */}
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                
                // STEP : 11 
                // {...register} - aise hi use krte hai , always 
                // // and register ke ander (1st- key value, 2nd - object)
                {...register("email", {
                // 2nd value hai, object
                // and obejct me hum bahut saare options pass krte hai.
                //1st option true h    
                required: true,
                // 2nd option validate h
                // hum email ko validate krne ka pattern likhenge.
                validate: {
                // Use this site: https://regexr.com/
                // Go to Community Pattern 
                // then Search : Email -> Email (normal we are using)
                // then copy the expression
                // pattern likhne ke baad .test then test ke ander "value" jo starting me liye h
                // same value pass kr do like - .test(value)
                // agar pattern se validate ho jaata h email to thik, warna || ke pass "message pass kr do".
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                {/* STEP : 12  */}
                <Input
                // Input ke ander label le liya.
                label="Password: "
                // type - password le liya
                type="password"
                //palceholder me "Message " pass kr diya.
                placeholder="Enter your password"

                // Ab apna javascript open kro {}, then ... (spread krna imp h)
                //then register ko spread kr diya hu.
                // ab register ke anderr key and object pass krna hoga.
                //01- Key hum de dete hai password
                //02- object (maan kre to pass kijiye warna ni)
                //  humne required: true pass kr diya.
                {...register("password", {
                    required: true,
                })}
                />

                {/* STEP : 13  */}
                {/* // Input field ho gaya h then, ek button bhi chahiye hoga  */}
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login