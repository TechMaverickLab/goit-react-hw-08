import { createAsyncThunk } from '@reduxjs/toolkit';
        import axios from 'axios';
        
        const API_URL = 'https://connections-api.herokuapp.com/contacts';
        
        export const addContact = createAsyncThunk('contacts/addContact', async (contact, { rejectWithValue }) => {
            try {
                const response = await axios.post(`${API_URL}`, contact);
                return response.data;
            } catch (error) {
                return rejectWithValue(error.message);
            }
        });
        
        export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, { getState, rejectWithValue }) => {
            const token = getState().auth.token;
            if (!token) {
              return rejectWithValue('No token provided');
            }
            try {
              const response = await axios.get(API_URL);
              return response.data;
            } catch (error) {
              return rejectWithValue(error.message);
            }
          });
          
          
          export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, { rejectWithValue }) => {
            try {
                await axios.delete(`${API_URL}/${contactId}`);
                return contactId;
            } catch (error) {
                return rejectWithValue(error.message);
            }
          });
          
          export const editContact = createAsyncThunk('contacts/editContact', async ({ id, data }, { rejectWithValue }) => {
            try {
                const response = await axios.patch(`${API_URL}/${id}`, data);
                return response.data;
            } catch (error) {
                return rejectWithValue(error.message);
            }
          });
          
        