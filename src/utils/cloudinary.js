import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
  cloudinary.config({ 
        cloud_name: 'm1sqptf5', 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
    });
const cloudinaryUpload = async function (localFilePath) {
    try {
        if(!localFilePath) return null ;
        //upload the file on clodinary 
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        // file has been uploaded successfully 
        console.log('file has been successfully',response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporararily saved file 
        return  null ;
    }
}    
export {cloudinaryUpload};