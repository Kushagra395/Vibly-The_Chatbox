import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 6,
     },
    profilePic: {
        type: String,
        default: "",
    }},
      {timestamps: true},
    )

 const User = mongoose.model("User", userSchema)//always remenber module name will be singular and 1st letter capital
 export default User
// ----IMPP GENERAL------------------------
//  for user detail consist of 
//  Email 
//  full name
//  pswd
//  profile pic

// and id will be autogiven by it so no need to worry about that
//this is main schema for user


