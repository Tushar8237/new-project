import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";


// Register a new user
export const registerUser = async ( req, res, next ) => {
    const { username, email, password, profilePicture } = req.body;

    try {
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
        const token = jwt.sign({
            id : user._id,
            username : user.username,
        })

        const userWithoutPassword = user.toObject();

        delete userWithoutPassword.password; // Remove password from the user object

        return res.status(201).json({
            message: "User registered successfully",
            user : userWithoutPassword,
            token,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}