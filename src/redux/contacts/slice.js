

import { createSlice } from '@reduxjs/toolkit';
import * as operations from './operations';
import { logOut } from '../auth/operations'; 

const slice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(operations.fetchContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(operations.fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(operations.fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(operations.addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(operations.deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter((contact) => contact.id !== action.payload);
            })
            .addCase(operations.editContact.fulfilled, (state, action) => {
                const index = state.items.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(logOut.fulfilled, (state) => {
                
                state.items = [];
                state.loading = false;
                state.error = null;
            });
    },
});

export default slice.reducer;
