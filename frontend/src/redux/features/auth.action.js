import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axiosInstance'


export const registerUser = createAsyncThunk(
    'auth/register',
    async ( userData, thunkApi) => {
        try {
            const response = await axios.post('/auth/register', userData)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Registration failed"
            )
        }
    }
)