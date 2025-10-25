// src/redux/feature/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "hackathon_cart_v1";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore
  }
}

const persisted = loadFromStorage();

const initialState = persisted ?? {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const recalcTotals = (state) => {
  state.totalQuantity = state.cartItems.reduce((acc, it) => acc + it.quantity, 0);
  state.totalPrice = state.cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((p) => p.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      recalcTotals(state);
      saveToStorage(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((p) => p.id !== id);
      recalcTotals(state);
      saveToStorage(state);
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((p) => p.id === id);
      if (item) {
        item.quantity += 1;
      }
      recalcTotals(state);
      saveToStorage(state);
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((p) => p.id === id);
      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else {
          // if quantity becomes 0, remove item
          state.cartItems = state.cartItems.filter((p) => p.id !== id);
        }
      }
      recalcTotals(state);
      saveToStorage(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
      saveToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
