import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrderApi } from "../api/apiStore";

export const placeOrder = createAsyncThunk("order/placeOrder", async (orderData, { rejectWithValue }) => {
  try {
    return await placeOrderApi(orderData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


const initialState = {
  orderNumber: null,
  eta: null,
  status: "idle",
  error: null,
};


const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(placeOrder.pending, (state) => void (state.status = "loading"))
      .addCase(placeOrder.fulfilled, (state, { payload }) => {
        state.orderNumber = payload.order.id;
        state.eta = payload.order.eta;
        state.status = "succeeded";
      })
      .addCase(placeOrder.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      }),
});

export default orderSlice.reducer;
