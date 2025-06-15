import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest: (state, action) => {
            return action.payload;
        },
        removeRequest: (state, action) => {
            const newArray = state.filter((r) => r.fromUserId._id !== action.payload);
            return newArray;
        },
        clearRequest: () => {
            return null;
        },
    },
});

export const { addRequest, removeRequest, clearRequest } = requestSlice.actions;
export default requestSlice.reducer;