import express from 'express';
import { protectedRoute } from '../middleware/auth_Protected_Route.js';
import { getMessages, getUserForSidebar,sendMessage } from '../controllers/message_controller(logic).js';

const router = express.Router(); 


router.get("/users",protectedRoute, getUserForSidebar) // user jo sidebar mai dikhenge
router.get("/:id",protectedRoute, getMessages) //ye id uski hai jiske sath chat kar rehe hai //and ye route jiski id hai uske chat kholne ke liye and previous message load karne ke liye route

router.post("/send/:id",protectedRoute,sendMessage) // here we will feed message {  text and image} which we will get frontend to database and also to cloudnariry 
export default router;