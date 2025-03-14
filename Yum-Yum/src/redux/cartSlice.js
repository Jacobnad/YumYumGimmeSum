import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const existingItem = state.items.find((item) => item.id === payload.id);
      existingItem ? existingItem.quantity++ : state.items.push({ ...payload, quantity: 1 });
      state.total += payload.price;
    },

    removeFromCart(state, { payload }) {
      const itemIndex = state.items.findIndex((item) => item.id === payload.id);
      if (itemIndex !== -1) {
        state.total -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },

    decreaseQuantity(state, { payload }) {
      const existingItem = state.items.find((item) => item.id === payload.id);
      if (!existingItem) return;
      
      existingItem.quantity > 1 ? (existingItem.quantity--, state.total -= existingItem.price)
        : (state.items = state.items.filter((item) => item.id !== payload.id), state.total -= existingItem.price);
    },

    clearCart: () => initialState,
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
