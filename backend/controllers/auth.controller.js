import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'; // For hashing passwords
import generateTokenAndSetCookie from '../utils/generteToken.js';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordValid = await bcrypt.compare(password, user?.password || '');
        if (!user || !isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        generateTokenAndSetCookie(user._id, res); // Generate token and set cookie
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log('Error logging in user:', error);
        res.status(500).json({ message: "Internal server error" });
    }
    console.log('Login user:');
}

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res); // Generate token and set cookie
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {

        }

    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}
    console.log('Signup user:');
// https://avatar-placeholder.iran.liara.run   頭像網址
// https://avatar.iran.liara.run/public/girl 


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

}