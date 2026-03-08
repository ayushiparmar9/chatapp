import express from "express";
import { getAllUsers,updateProfile }   from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all users
router.get("/allUsers",Protect, getAllUsers);
router.put("/profile", Protect, updateProfile);

export default router;