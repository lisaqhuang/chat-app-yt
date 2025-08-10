import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Assuming you have a User model

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Assuming the token is stored in cookies
        console.log('Token from cookies:', token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized-invalid token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
export default protectRoute;