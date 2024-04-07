import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as contactsOperations from '../contacts/contactsOperations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(contactsOperations.fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(contactsOperations.fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(contactsOperations.fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(contactsOperations.addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(contactsOperations.deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      })
      .addCase(contactsOperations.editContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const selectFilteredContacts = createSelector(
  [(state) => state.contacts.items, (state) => state.filters.name],
  (items, nameFilter) =>
    items.filter((contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
);

export default contactsSlice.reducer;
