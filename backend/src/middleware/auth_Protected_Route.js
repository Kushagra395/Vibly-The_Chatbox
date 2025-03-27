import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const protectedRoute = async (req, res, next) => {
    try {
        //token chipak kar hi chalta hai tho dekh rehe req mai aaya hai ki nhi
      const token = req.cookies.jwt; 
   //if token nhi 
      if (!token) {
        return res.status(401).json({ message: "Unauthorized token not found" });}
   //decoding the the token and verifiyign it
     const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
     if(!decodetoken){
        return res.status(401).json({ message: "Unauthorized token unverified" });
        }
    // token mai jo id hai usse user ka pata and sending to req
     const user = await User.findById(decodetoken.userId);
     req.user = user;
     //if all goes well then next step
     next();
   
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("error in protected route",error)
        
    }
}