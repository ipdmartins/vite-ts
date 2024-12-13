import { createSlice } from "@reduxjs/toolkit";
// import getUsers from "./usersActions";

const initialState = {
  users: [
    {
      uuid: "",
      givenName: "",
      familyName: "",
      phone: "",
      email: "",
      password: "",
    },
  ],
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({
        ...action.payload,
      });
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getUsers.fulfilled, (state, action) => {
  //     state.users = action.payload;
  //   });
  // },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
