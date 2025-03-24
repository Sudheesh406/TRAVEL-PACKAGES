
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice'
import companySlice from './companySlice'
import packageFormSlice from './packageFormSlice'
import packageSecondFormSlice from './packageSecondFormSlice'
import packageSlice from './packageSlice'
const store = configureStore({
  reducer: {
    user:userSlice,
    company:companySlice,
    packageForm:packageFormSlice,
    packageSecondForm:packageSecondFormSlice,
    package:packageSlice
  }, 
});

export default store;

