
import {configureStore} from "@reduxjs/toolkit";
import getCryptoData from "./slices/getCryptoData.js";

const store = configureStore({
    reducer : {
    getCryptoData
    }
})

export default store;