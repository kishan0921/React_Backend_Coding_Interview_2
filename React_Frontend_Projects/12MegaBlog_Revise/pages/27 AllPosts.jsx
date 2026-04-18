
// STEP : 02
//Ab saare ke saare post directly hume ni milenge,
//to hume ek useState chahiye hoga, kyuki saare post pe hume ek query krni hogi.
// and saath me useEffect bhi le lte hai.
import React, {useState, useEffect} from 'react'

// STEP : 01
// container and postcard component le lete hai from components
import { Container, PostCard } from '../components'
// then ek appwrite kis service bhi chahiye hogi 
import appwriteService from "../appwrite/config";


// STEP : 03
// 1 function bana lete hai
// and issko yahi pe export nhi kr rahe hai.
function AllPosts() {
    // STEP : 04
    // sabse pehle ek variable bana lete hai post , isske ander hum saare ke saare post lenge
    // starting me empty array pass krenge
    const [posts, setPosts] = useState([])

    // useeffect hook le lete hai
    useEffect(() => {}, [])

    // appwrite service ko bolte hai, saare post chahiye
    // getpost ke ander [] (empty value pass kr dete hai, 
    // taaki isske ander saari value aa jaaye)
    appwriteService.getPosts([])
    // STEP : 05
    // agar getposts successful hua h, to .then warna .catch
    // then ke ander callback "()=>{}" mil jaayega
    // callback ke ander appko saare post mil jaayenge
    .then((posts) => {
        // ab agar posts aaye hai, ya mil gaye hai
        if (posts) {
            // then hum setPosts ka use krenge, and saare ke saare posts le lenge.
            // and post ke ander document mil jaayenge saare ke saare.
            // then ab to post and ander saari value hai hi.
            // ab bas next step loop laagao and iterate kr lo har 1 post ko and show kr do.
            setPosts(posts.documents)
        }
    })
  return (
    // STEP : 06
    <div className='w-full py-8'>
        {/* // ye lijiye container le aaye  */}
        <Container>
            <div className='flex flex-wrap'>
                 {/* STEP : 07  */}
    {/* // post hai hi apne pass saare, ab loop laga dete hai map  */}
        {/* har map ke ander aapko 1 post mil jaayega  */}
                {posts.map((post) => (
                    // yaha pe hum key, aur value ka value de diye h
                    // key - har post ke pass unique id pass kr raha hu
                    // value - har post ke ander saare value mil jaayenge
                    <div key={post.$id} className='p-2 w-1/4'>
                        {/* // then postcard ko call kr lo , and data send kr do  */}
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            {/* and container end kr dete hai  */}
            </Container>
    </div>
  )
}

export default AllPosts