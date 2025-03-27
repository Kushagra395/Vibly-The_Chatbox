import express from 'express'
import { login, logout, reloadCheck, signup, updateProfile } from '../controllers/auth_controller(logic).js';
import { protectedRoute } from '../middleware/auth_Protected_Route.js';

const router = express.Router()

router.post("/signup", signup); // for sign up 

router.post("/login", login);

router.post("/logout", logout);

router.put("/updateProfile", protectedRoute, updateProfile);

router.get("/Check", protectedRoute, reloadCheck); //will run whenever user reload the page


export default router