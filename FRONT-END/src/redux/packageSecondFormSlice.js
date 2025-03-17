import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    packageSecondForm: null, 
};

const packageSecondFormSlice = createSlice({
  name: 'packageSecondForm',
  initialState,
  reducers: {
    setPackageSecondForm: (state, action) => {
      state.packageSecondForm = action.payload; 
    },
    clearPackageSecondForm: (state) => {
      state.packageSecondForm = null; 
    },
  },
});

export const { setPackageSecondForm, clearPackageSecondForm } = packageSecondFormSlice.actions;
export default packageSecondFormSlice.reducer;
