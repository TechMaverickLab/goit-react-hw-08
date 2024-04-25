import { createSelector } from '@reduxjs/toolkit';
        
        
        const selectContactsState = (state) => state.contacts;
        
        
        export const selectAllTasks = createSelector(
          [selectContactsState],
          (contactsState) => contactsState.items
        );
        
        
        
        export const selectContactsError = createSelector(
          [selectContactsState],
          (contactsState) => contactsState.error
        );
        
        
        export const selectFilteredContacts = createSelector(
          [(state) => state.contacts.items, (state) => state.filters.name],
          (items, filterString) => items.filter((contact) =>
            contact.name.toLowerCase().includes(filterString.toLowerCase()) ||
            contact.number.toLowerCase().includes(filterString.toLowerCase())
          )
        );