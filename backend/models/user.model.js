import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
            minlength : [8, "Password must be at least 8 characters long"],
            validate: {
                validator: (value) =>
                  /[A-Z]/.test(value) && /[^A-Za-z0-9]/.test(value), // at least one uppercase & one special char
                message:
                  'Password must contain at least one uppercase letter and one special character.',
              },
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

// Pre-save hook for hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    // Validate confirmPassword manually
    if (this.password !== this.confirmPassword) {
      throw new Error("Passwords do not match");
    }
  
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined; // Remove from DB
    next();
});


const User = mongoose.model("User", userSchema);
export default User;
