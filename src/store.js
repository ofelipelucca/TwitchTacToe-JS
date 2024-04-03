import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducers.js";

const store = configureStore({
    reducer: {
        game: gameReducer
    }
});

export default store;