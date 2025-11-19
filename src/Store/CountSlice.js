import { createSlice } from '@reduxjs/toolkit';

const CountSlice = createSlice({
  name: 'users',
  initialState: { 
    usercount: '0',
    profile: {
      name: '',
      email: '',
      avatar: ''
    }
  },
  reducers: {
    updateCount: (state, action) => {  
      state.usercount = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    clearProfile: (state) => {
      state.profile = { name: '', email: '', avatar: '' };
    }
  },
});


// Export actions
export const { updateCount, updateProfile, clearProfile } = CountSlice.actions;

// Export reducer
export const CountReducer = CountSlice.reducer;

