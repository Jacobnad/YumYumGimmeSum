import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";


const loadState = (key, defaultState) => JSON.parse(localStorage.getItem(key)) || defaultState;

const preloadedState = {
  cart: loadState("cart", { items: [], total: 0 }),
  order: loadState("order", { orderNumber: null, eta: null, status: "idle", error: null }),
};

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  preloadedState,
});


store.subscribe(() => {
  const { cart, order } = store.getState();
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("order", JSON.stringify(order));
});

export default store;
