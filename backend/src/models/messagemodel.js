import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    //each message will have sender id & reciever id which is refrence to user and then has text and image
    senderId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
     },
     recieverId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
     },
     text: {
        type : String,
     },
     image: {
        type : String,
     }
   },
      {timestamps: true},
    )

 const Message = mongoose.model("Message", messageSchema)//always remenber module name will be singular and 1st letter capital
 export default Message

 //sender and receiver id req