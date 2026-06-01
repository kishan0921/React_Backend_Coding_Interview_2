
// STP :01
// Mujhe Cloudinary ka package import krna hai ..jisse npm krke install kiya hu 
const cloudinary = require("cloudinary").v2;


// STEP :02 
//1. Function UploadImageToCloudinary create kr liya hai 
//Ek bar yaad karo  
// yaad karo SliceReducer me kya kya likha tha wo sab same yaha bhi likhenge
// and yaha File, Folder,height,Quality as parameter pass Kar diya hu
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
     // File,Folder,height,quality maine suppose kr liye input me milenge

     // STEP :03 Ab Woohi same mujhe option banane honge.
     // Note- Niche ye pura syntax Exaaclty same hai, file upload waala video me
     //1. Ab option banane pdte hai, and isske ander mujhe folder rahkna padega
     const options = {folder};


     // STEP :04 
     //2. Agar height input me aayi hai to option ke ander ussko include kr dunga
     if(height){
        options.height = height;
     }

     // STEP :05
     //3. Agar Quality input me aayi hai to option ke ander ussko include kr dunga
     if(quality){
        options.quality = quality;
     }

     // STEP:06
     // 4.Best practie me bola tha ...option ke ander resource type 
     // auto kar dena taaki wo apne aap detect kr lega ki kiss type ki resouce hai
     options.resource_type = "auto";


     // STEP :07
     // 5.aur yaha maine upload kr diya, upload ke time file ka tempFilePath and options pass kr diya
     return await cloudinary.uploader.upload(file.tempFilePath, options);

}