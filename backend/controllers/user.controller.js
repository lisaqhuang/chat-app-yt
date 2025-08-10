import User from '../models/user.model.js'; // Assuming you have a User model defined

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Assuming you have user info in req.user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); // Exclude the logged-in user

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log('Error getting user for sidebar:', error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}