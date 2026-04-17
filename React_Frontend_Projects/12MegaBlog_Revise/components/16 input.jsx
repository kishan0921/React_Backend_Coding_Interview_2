
// STEP 00
// Note:  forwardRef ka use krenge- 2 Tarike se 
// 1st - this file input.jsx
// 2nd = select.jsx (export me "React.forwardRef" ye use kr liye h)


// STEP 01:
// Issme hum ek new chiz use krenge, Id to wo le liye hai react se
import React, {useId} from 'react'


// STEP 02:
// Ekdm same hum button.jsx jaisa hi likhne waale h,but yaha 
// new concept forwardRef ka use krenge.
// funct input bhi use kr skte hai, 
// but, thoda aache se structure way me rahe, issliye arrow function ka use kr lenge.
// Jo bhi property pass krenge, wo likhne se pehle mai 
// saara kuch React.forwardRef, isse ander likhunga.
// then forwardRef () - wrappup kr diya hu
// then ab forwardRef () ke ander - function define krunga.
// function then function ka input() 
// and {} ye raha isska defination.

// Summar : Input() - ye raha mera input and Input(){} - ye raha mera definition
// Then : - Input({}){} - ({}) Input ke nader kya kya lenge wo sb {} ke ander lenge. 
const Input = React.forwardRef( function Input({

    // STEP 03:
    // ye raha function ka input overall
    // input ke ander sabse pehle label liye h
    // Kyuki Input kai jagah use hone waala,Kisi jagah "Username", "Password" label hoga
    //to ek label dena banta hi h
    label,
    // then Input ka type pata hona chahiye hum, Like - text hoga and value "text" de rahe h bydefault value.
    type = "text",
    // then ClassName dena hoga, Most of the cases me className = "" empty hi liya jaata hai.  same way button.jsx me bhi liya tha
    className = "",
    // Ab ek baat aapko pata hai, 
    // Q. Hum Props bhi lete hai....Kyu ?
    // Kyuki infuture Lable,type,className ke alawa kuch aur properties add krna hoga 
    // to hum add kr denge.

    // Props - properties bhi pass kr diya hai, (like aur bhi property bologe to add kr denge)
    // then props pass kr diya hu and spread kr diya hu
    ...props
}, // STEP : 04
// and uppar ye jo input hai jo bhi use krenga usse ek "ref" bhi pass krega. and ye bahut zaruri hai.
// and yahi reason hai.......hum "forwardRef" use kiye hai starting me
// Then yaha end hota hai ye input ke ander jo bhi lena tha...now
// Chinta mt kro issko kaise use krenge...wo baad me dekhenge.
ref){
    // and yaaha se start hota hai, function ka definition.

    // STEP : 05.2
    // Use id kaise use krte hai ? bhool gaye 
    // ye raha aise use krte h
    const id = useId()


    return (
        // STEP : 05
        // ab yaaha pe mere pass ek div hai and className usska name "w-full" hai.
        <div className='w-full'>
            // Now, agar kisi ne label pass kiya hai then only && ke baad jo likha hai show kro nahi to nahi.
            // Lable component hum show krenge ni  to ni.
            // same use kiya hu button.jsx file me
            {label && <label 
            // Now aur label pass hua then , and jo display krna h yaha likho.
            className='inline-block mb-1 pl-1' 

            // STEP : 05.1
            // Why hum htmtFor use kiye hai ?
            // sabse pehle Id banana hoga.  " const id = useId()", then simply hum htmlFor ke ander "id" use kr lenge.
            // ab hume useId import kiya hu , for generating unique id
            // so using htmlFor  and isske ander {id} pass krne se unique id milegi hume
            htmlFor={id}>
                {label}
            </label>
            }

            {/* // STEP : 06 */}
            {/* // Now ab chahiye input */}
            <input
            //Input ke nader hume isska type define krna hoga.
            // ab type user ne diya h to thik nhi to default "text" jo define kiye h use kr lenge.
            type={type}
        // yaha humne classname me px-3 ,py-2 etc pass kiya hu and laste me agar koi default value hoga to wo bhi inclue kr liya hu. ${className}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            
            // STEP :06.1
            // ab ref jo apne user se liya h, as a props ussko pass kr do
            // note: yahi wo chiz hai, jo aapko ref degi parent component ke ander, issliye humne apna "forwardRef" hook use kiya hai
            ref={ref}
            // aur kuch bhi value pass hua hai to yaha likh lo
            {...props}
            
            //STEP : 06.2
            // and ye sab ke alwala , ab yaha bhi id pass kr lete hai.
            //Note: ek acchi chiz hui h,actually me "const id = useId()" jo ek unique id generate hui h. wo label me bhi lg gayi h.
            // and aapke input field me bhi lg gayi h.
            //Taaki jab koi uss label pe click kre uss input pe to highlight ho jaaye and cursor wooha chale jaaye.
            id={id}
            />
        </div>
    )
})

export default Input