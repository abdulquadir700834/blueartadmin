import { configureStore } from '@reduxjs/toolkit';

import {  getUserDetails   } from '../Store/Store';
import authSlice from '../Store/authSlice';
import {Apilist } from "../service/Apilist"

export default configureStore({
  reducer: {
    [getUserDetails.reducerPath]: getUserDetails.reducer,
    [Apilist.reducerPath]: Apilist.reducer,
    authSlice
    
  },
  middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(getUserDetails.middleware),
});