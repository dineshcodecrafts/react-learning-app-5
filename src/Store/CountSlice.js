import { createSlice } from '@reduxjs/toolkit';

const CountSlice = createSlice({
  name: 'users',
  initialState: { usercount: '0' },
  reducers: {
    updateCount: (state, action) => {  
      state.usercount = action.payload;
    }
  },
});



// Export actions and reducers
export const { updateCount } = CountSlice.actions;
export const CountReducer = CountSlice.reducer;

