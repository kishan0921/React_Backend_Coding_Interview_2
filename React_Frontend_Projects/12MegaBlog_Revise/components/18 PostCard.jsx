// Ab hum post-cards banayenge kyuki ye bahut easy hai.
// and mostly issme css hi used hua hai.


// STEP 01:
import React from 'react'
// jo information use krenge , wo appwriteService me se le rahe h
import appwriteService from "../appwrite/config"
// link bhi legega to le lete h
import {Link} from 'react-router-dom'

// STEP 02:
function PostCard({
    // iss postcard ko display krne ke liye kuch properties pass krenge
    // $id - hi likha jaata hai, appwrite use kr rahye appwrite ka issue hai, appwrite me aise hi likha jaata h
    // yahi syntax h
    //Then, title chahiye mujhe, and featured Image chahiye
    $id, title, featuredImage}) {
    

      // STEP 03:
  return (
    // saara ka saara card clickable hoga to Link tag use kr liya hu.
    // and kaha redirect hoga to {`/post/${$id}`} me hoga
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
              {/* // Step :04 */}
              {/* Ab isske ander kuch ni, ek image liya h and text bas. */}
              {/* Appwrite ki service me (src/appwrite/config.js) ek getFilePreview waala feature h  
              isska use kr lenge, then merea featuredImage waala ka id pass kr diya hu.
              */}
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>

            {/* Image end ho jaata hai, then ek H2 hai mere pass  */}
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard