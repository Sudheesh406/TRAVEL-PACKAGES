import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  packageForm: null, 
};

const packageFormSlice = createSlice({
  name: 'packageForm',
  initialState,
  reducers: {
    setPackageForm: (state, action) => {
      state.packageForm = action.payload; 
    },
    clearPackageForm: (state) => {
      state.packageForm = null; 
    },
  },
});

export const { setPackageForm, clearPackageForm } = packageFormSlice.actions;
export default packageFormSlice.reducer;
