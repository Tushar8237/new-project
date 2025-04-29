import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        confirmPassword: {
            type: String,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        profilePicture: {
            type: String,
            default:
                "https://iconarchive.com/download/i107195/Flat-Design/User-Profile-2/user-profile-icon.ico",
        },
    },
    { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;
