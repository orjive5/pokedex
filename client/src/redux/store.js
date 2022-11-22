import { configureStore } from "@reduxjs/toolkit";
import stepReducer from "./slices/stepSlice";
import signupReducer from "./slices/signupSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    step: stepReducer,
    signup: signupReducer,
    currentUser: userReducer,
  },
});
