import jwt from "jsonwebtoken";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode; // Attach the decoded user information to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(403).json({ message: "Invalid token" });
    }
}

export default verifyToken;