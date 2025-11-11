import { configureStore } from '@reduxjs/toolkit';
import { CountReducer} from './CountSlice';


export const store = configureStore({
  reducer: {
    users: CountReducer,
  },
});
export default store;