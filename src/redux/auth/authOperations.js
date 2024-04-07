import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/users/signup', userData);
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : {message: error.message});
  }
});

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/users/login', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error);
  }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.token;

  if (!token) return rejectWithValue('No token found');

  try {
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error);
  }
});