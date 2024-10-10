import { configureStore } from '@reduxjs/toolkit';

import authslice from './authslice';
import lawyerslice from './lawyerslice';

const store = configureStore({
  reducer: {
    auth : authslice,
    lawyer: lawyerslice
  },
});

export default store;