import express from 'express';
import { sendMessage } from '../controllers/message.controller.js'; // Importing message controller functions
import protectRoute from '../middleware/protectRoute.js'; // Importing protectRoute middleware
import { getMessage } from '../controllers/message.controller.js'; // Importing getMessage function


const router = express.Router();
router.get("/:id", protectRoute, getMessage);//先確認是否有權限,檢查jwt token
router.post('/send/:id', protectRoute, sendMessage);//先確認是否有權限,檢查jwt token

export default router;
