import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import feedReducer from './feedSlice'; // Assuming you have a feedSlice.js for feed management

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
    },
})

export default appStore;