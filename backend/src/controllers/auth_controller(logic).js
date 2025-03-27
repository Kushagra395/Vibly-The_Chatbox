import { generateToken } from "../lib/cookiegen.js";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    //checking if all fields are filled
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //checking password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    //checking if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //adding to database in in a new user
    const newUser = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      //GENERATE TOKEN
      generateToken(newUser._id, res);
      await newUser.save(); //save the database

      return res.status(201).json({
        //status send which can be seen on postman
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: "User created successfully",
      });
    } else {
      //koi reason ke vajah sai new user nahi baan paya then display this message
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    //any error then display this
    console.log("error in signup controller", error);
    return res.status(500).json({ message: " internal Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //  res.send("login route")
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (user && isValidPassword) {
      const token = generateToken(user._id, res);

      res.status(200).json({
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic,
        message: "User logged in successfully",
        token: token,
      });
    }
  } catch (error) {
    console.log("error in login controller", error);
    res.status(500).json({ message: " internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", { maxAge: 0 });
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error at logout ", error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "profile pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic); //cloudnary mai upload karenge
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ); //user ke data base mai update kiya photo and new data updated user mai dalne ke liye {new:true} kiya nhi tho update ke pehle wala jata new thing to learn
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error at update profile ", error);
  }
};
//reload check run when user eelaod page
export const reloadCheck = (req, res) => {
  try {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error at reload check ", error);
  }
};
