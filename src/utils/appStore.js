import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import feedReducer from './feedSlice'; // Assuming you have a feedSlice.js for feed management
import connectionReducer from './connectionSlice'; // Assuming you have a connectionSlice.js for connection management
import requestReducer from './requestSlice'; // Assuming you have a requestSlice.js for request management

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: connectionReducer,
        request: requestReducer,
    },
})

export default appStore;