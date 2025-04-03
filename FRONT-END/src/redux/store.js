
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice'
import companySlice from './company/companySlice'
import packageFormSlice from './forms/package/packageFormSlice'
import packageSecondFormSlice from './forms/package/packageSecondFormSlice'
import packageSlice from './package/packageSlice'
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

