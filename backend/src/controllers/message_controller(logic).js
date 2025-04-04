import User from "../models/usermodel.js"
import Message from "../models/messagemodel.js"
import cloudinary from "../lib/cloudinary.js"


//we want every user to fetch of get but not ourself in the sidebar keeping this in mind
export const getUserForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } })
        res.status(200).json(filterUsers);
        
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log("error at get user for sidebar ",error)
    }

}
//here we will get all old message with specific use jiska chat kholenge
export const getMessages = async(req, res) => {
    try {
        const {id:userToChatId}= req.params // jisse chat kar rehe uski id milli hai 
        const myId = req.user._id // req sai aapni id li hai 
        const message = await Message.find({ //wo saare message find karo jo senderId myId and recieverId userToChatId hai and vice versa 
            $or: [
                { senderId: myId, recieverId: userToChatId }, //and aab usko data base compare kiya 
                { senderId: userToChatId, recieverId: myId }
                ]
        })
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log("error at get messages ",error)
        
    }
}

//yaha new message datbase mai post karenge jo frontend mai send karenge
export const sendMessage = async(req, res) => {
    try {
        const {text,image} = req.body;
        const {id:anotherpersonId} = req.params;
        const myId = req.user._id;

    let imageUrl;

    if(image){
        //uploading image to cloundaniry and its url in the imageurl variable which will now feed to database 
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url
    }
    const newmessage = new Message({ //feeding all data to database 
        senderId:myId,
        recieverId:anotherpersonId,
        text:text,
        image:imageUrl
        })
        await newmessage.save()
        res.status(200).json(newmessage)

      //todo ==>> here will cone real time chat by using socket.io


    } catch (error) {
         res.status(500).json({message:"internal server error"})
         console.log("error at send message ",error)
    }
}