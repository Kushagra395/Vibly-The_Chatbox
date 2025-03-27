//all this code is for cloudinary and is setof of code which is repeated same all time
//  so can get from website 

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

 dotenv.config();
// Configuration of cloudinary

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
  });

    export default cloudinary;

//cloudinary we have install already