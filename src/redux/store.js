import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import contactsReducer from './contacts/contactsSlice';
import filtersReducer from './filters/filtersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});
