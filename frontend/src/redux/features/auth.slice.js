import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./auth.action";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: false,
    },

    reducers: {
        clearError: (state) => {
            state.error = null;
        },

        clearSuccess: (state) => {
            state.success = false;
        },
    },

    extraReducers: (builder) => {
        builder
            // Register user
            .addCase(registerUser.pending, (state) => {
                (state.loading = true), (state.error = null);
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                (state.loading = false), (state.success = true);
            })

            .addCase(registerUser.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            });
    },
});

export const { clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;
