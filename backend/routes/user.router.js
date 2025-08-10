import express from 'express';
import protectRoute from '../middleware/protectRoute.js'; // Importing protectRoute middleware
import { getUserForSidebar } from '../controllers/user.controller.js'; // Importing getUserForSidebar function

const router = express.Router();
router.get("/", protectRoute, getUserForSidebar)

export default router;