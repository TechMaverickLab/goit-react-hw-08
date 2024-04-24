import { createSelector } from '@reduxjs/toolkit';
        
        // Селектор для отримання базового стану контактів
        const selectContactsState = (state) => state.contacts;
        
        // Селектор для отримання масиву контактів
        export const selectAllTasks = createSelector(
          [selectContactsState],
          (contactsState) => contactsState.items
        );
        
        
        // Селектор для отримання стану помилок при роботі з контактами
        export const selectContactsError = createSelector(
          [selectContactsState],
          (contactsState) => contactsState.error
        );
        
        // Селектор для фільтрації контактів згідно з фільтром, збереженим у redux
        export const selectFilter = createSelector(
          [(state) => state.contacts.items, (state) => state.filters.name],
          (items, filterString) => items.filter((contact) =>
            contact.name.toLowerCase().includes(filterString.toLowerCase()) ||
            contact.number.toLowerCase().includes(filterString.toLowerCase())
          )
        );