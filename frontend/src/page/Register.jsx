import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../redux/features/auth.action";
import { useNavigate } from "react-router-dom";
import { clearSuccess } from "../redux/features/auth.slice";

function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, success } = useSelector((state) => state.auth)
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (success) {
            toast.success("Registration successful")
            setFormData({ username: "", email: "", password: "", confirmPassword: "" })
            dispatch(clearSuccess())
            navigate('/login')
        }
    })

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Password do not Match!");
            return;
        }
        
        try {
            const res = await dispatch(registerUser(formData)).unwrap()
        } catch (error) {
            toast.error(error.message || 'Registration Failed')
            console.error('Registration error', error)
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Name</label>
                <input
                    name="username"
                    type="text"
                    required
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <label htmlFor="">Email</label>
                <input
                    name="email"
                    type="text"
                    required
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <label htmlFor="">Password</label>
                <input
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <label htmlFor="">Confirm Password</label>
                <input
                    name="confirmPassword"
                    type="password"
                    required
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <button
                    className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded w-full"
                    type="submit"
                >
                    { loading ? "Registering" : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;
