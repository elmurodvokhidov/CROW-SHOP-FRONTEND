import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slices/productSlice";

export const store = configureStore({
    reducer: {
        // users: userSlice
        products: productSlice,
        // categories: categorySlice,
    }
});