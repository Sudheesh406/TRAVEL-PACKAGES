import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  package: null, 
};

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    setPackage: (state, action) => {
      state.package = action.payload; 
    },
    clearPackage: (state) => {
      state.package = null; 
    },
  },
});

export const { setPackage, clearPackage } = packageSlice.actions;
export default packageSlice.reducer;