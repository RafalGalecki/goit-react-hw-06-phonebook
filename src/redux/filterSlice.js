import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = '';

const filterSlice = createSlice({
    name: "filter",
    initialState: filterInitialState,
    reducers: {
        setFilter: {
            reducer(state, action) {

            }
        }

    }
});

export const { setFilter } = filterSlice.actions;
export const { filterReducer } = filterSlice.reducer;
