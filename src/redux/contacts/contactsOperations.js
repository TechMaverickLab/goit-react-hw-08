import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const addContact = createAsyncThunk('contacts/addContact', async (contact, { rejectWithValue }) => {
    try {
        const response = await axios.post('/contacts', contact);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, { rejectWithValue }) => {
  try {
      const response = await axios.get('/contacts');
      return response.data;
  } catch (error) {
      return rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, { rejectWithValue }) => {
  try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
  } catch (error) {
      return rejectWithValue(error.message);
  }
});

export const editContact = createAsyncThunk('contacts/editContact', async ({ id, data }, { rejectWithValue }) => {
  try {
      const response = await axios.patch(`/contacts/${id}`, data);
      return response.data;
  } catch (error) {
      return rejectWithValue(error.message);
  }
});

const contactsOperations = {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
};

export default contactsOperations;

