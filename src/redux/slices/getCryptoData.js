import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: 'loading'
};

export const fetchCoin = createAsyncThunk('items/fetchCoin', async () => {
    try {
        const options = {
            method: 'GET',
            url: 'https://openapiv1.coinstats.app/coins',
            params: {limit: '20'},
            headers: {
                accept: 'application/json',
                'X-API-KEY': '5Z9Y04620Bwai/ODBQu8U/dgUZQBlyZD+6T0Jcroy8M='
            }
        };
        const response = await axios.request(options);
        return response.data; // Assuming the data is in the response property
    } catch (error) {
        throw error;
    }
});

const getCryptoDate = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoin.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });
        builder.addCase(fetchCoin.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        });
        builder.addCase(fetchCoin.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });
    }
});

export const { setItems } = getCryptoDate.actions;
export default getCryptoDate.reducer;
