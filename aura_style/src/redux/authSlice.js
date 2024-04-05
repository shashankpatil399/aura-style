import { createSlice } from '@reduxjs/toolkit';
const token = localStorage.getItem("token")
console.log("token",token);
const initialState = {
    auth :null,
  isLoading: false,
  error: null,
  token,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      
      loginSuccess(state,action) {
        state.isLoading = false;
        state.error = null;
        state.login = action.payload.token
        console.log("action",action.payload);
      },

      loginFailure(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
  });
  
  export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;
  export default authSlice.reducer;
  