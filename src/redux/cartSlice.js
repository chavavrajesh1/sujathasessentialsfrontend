import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = {
  cartItems: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // ADD ITEM TO CART
    addToCart: (state, action) => {
      const item = action.payload;

      const exist = state.cartItems.find((x) => x._id === item._id);

      if (exist) {
        // If stock exists, increase qty
        if (exist.qty < (exist.countInStock || 99)) {
          exist.qty += 1;
        }
      } else {
        state.cartItems.push({
          ...item,
          qty: 1,
        });
      }

      saveCart(state.cartItems);
    },

    // REMOVE ITEM
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload
      );

      saveCart(state.cartItems);
    },

    // DECREASE QTY
    decreaseQty: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload);

      if (!item) return;

      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        // Auto-remove when qty reaches 1 → 0
        state.cartItems = state.cartItems.filter(
          (x) => x._id !== action.payload
        );
      }

      saveCart(state.cartItems);
    },

    // INCREASE QTY
    increaseQty: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload);

      if (!item) return;

      // Prevent going beyond stock
      if (item.qty < (item.countInStock || 99)) {
        item.qty += 1;
      }

      saveCart(state.cartItems);
    },

    // CLEAR CART
    clearCart: (state) => {
      state.cartItems = [];
      saveCart([]);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQty,
  increaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
