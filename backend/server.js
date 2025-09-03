import authRoutes from './routes/auth.routes.js'; // Importing auth routes
import dotenv from 'dotenv'; // For environment variable management
import express from 'express'; // Importing express framework
import connectToMongoDB from './db/connectToMongoDB.js'; // Importing MongoDB connection function
import messageRoutes from './routes/message.routes.js'; // Importing message routes
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.router.js'; // Importing user routes
import cors from 'cors';
import { app, server } from './socket/socket.js';
import path from 'path';





//for deployment
const __dirname = path.resolve(); // To get the directory name of the current module

//for deployment
//加入前端的build靜態檔案
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})



// const app = express();
dotenv.config();//用於可以讀取設定的env檔案

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
})); // Middleware to enable CORS
app.use(cookieParser()); // Middleware to parse cookies

const PORT = process.env.PORT || 5001;


// app.get('/', (req, res) => {
//     res.send('Welcome to the backend server!');
// })

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);





server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});