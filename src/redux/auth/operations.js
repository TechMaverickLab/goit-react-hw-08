import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';


const setAuthHeader = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common['Authorization'] = '';
};

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/users/signup', userData);
        localStorage.setItem('token', response.data.token);
        setAuthHeader(response.data.token);
        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        return rejectWithValue(error.response?.data?.message || error.message || 'Unknown error');
    }
});

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/users/login', userData);
        localStorage.setItem('token', response.data.token);
        setAuthHeader(response.data.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Unknown error');
    }
});

export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) return rejectWithValue('No token found');

    try {
        setAuthHeader(token);
        const response = await axios.get('/users/current');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Unknown error');
    }
});

export const logOut = createAsyncThunk('auth/logOut', async (_, { rejectWithValue }) => {
    try {
        localStorage.removeItem('token');
        clearAuthHeader();
        return true;
    } catch (error) {
        return rejectWithValue('Failed to log out');
    }
});