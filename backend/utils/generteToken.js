import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d' // Token will expire in 15 days
    })
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie will expire in 15 days
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: "strict", // Helps prevent CSRF attacks
        secure: process.env.NODE_ENV !== 'development' // Use secure cookies in production
    })
}
export default generateTokenAndSetCookie;