import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import { generateAccessToken } from "../util/token.js";


// Register a new user
export const registerUser = async ( req, res, next ) => {
    const { username, email, password, profilePicture } = req.body;

    try {

        // Check if the required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hashSync(password, 10);

        // Create a new user

        const user = new User({
            username,
            email,
            password : hashedPassword,
            profilePicture,
        });

        await user.save();

        // Generate a JWT token
        const token = generateAccessToken(user);

        // Set the token in a cookie
        res.cookie("access_token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge : 24 * 60 * 60 * 1000, // 1 day 
        })

        const userWithoutPassword = user.toObject();

        delete userWithoutPassword.password; // Remove password from the user object

        return res.status(201).json({
            message: "User registered successfully",
            user : userWithoutPassword,
        })

    } catch (error) {
        next(error)
    }
}

// Login a user
export const loginUser = async ( req, res, next ) => {
    const { email, password } = req.body;

    try {
        // Check if the required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = generateAccessToken(user);

        // Set the token in a cookie
        res.cookie("access_token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge : 24 * 60 * 60 * 1000, // 1 day 
        })

        const userWithoutPassword = user.toObject();

        delete userWithoutPassword.password; // Remove password from the user object

        return res.status(200).json({
            message: "User logged in successfully",
            user : userWithoutPassword,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// Logout a user
export const logoutUser = async ( req, res, next ) => {
    try {
        // Clear the cookie
        res.clearCookie("access_token");

        return res.status(200).json({
            message: "User logged out successfully",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}