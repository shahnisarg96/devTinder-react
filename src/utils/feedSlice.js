import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        setFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            const newArray = state.filter((r) => r._id !== action.payload);
            return newArray;
        },
        clearFeed: () => {
            return null;
        },
    },
});

export const { setFeed, removeFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
