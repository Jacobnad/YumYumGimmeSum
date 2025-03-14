import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenu } from "../api/apiStore";


export const fetchMenuData = createAsyncThunk("menu/fetchMenuData", async (_, { rejectWithValue }) => {
  try {
    const menu = await fetchMenu();
    return menu.sort((a, b) => (a.type === "dip") - (b.type === "dip"));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  items: [],
  status: "idle",
  error: null,
  selectedType: "wonton",
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuType: (state, { payload }) => {
      state.selectedType = payload;
    },
  },
  extraReducers: (builder) => 
    builder
      .addCase(fetchMenuData.pending, (state) => void (state.status = "loading"))
      .addCase(fetchMenuData.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.status = "succeeded";
      })
      .addCase(fetchMenuData.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      }),
});

export const { setMenuType } = menuSlice.actions;
export default menuSlice.reducer;
