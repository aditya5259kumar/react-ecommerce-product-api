import { configureStore } from "@reduxjs/toolkit";
import productApi from './slice/productApi'

export const store = configureStore({
    reducer:{
        app:productApi,
    }
}) 

export default store;