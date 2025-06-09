"use client";

import { createSlice } from "@reduxjs/toolkit";

const getCheckoutDataFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedItem = localStorage.getItem("checkoutItems");
    return storedItem ? JSON.parse(storedItem) : {};
  }
  return [];
};

const getGuestUserId = () => {
  if (typeof window !== "undefined") {
    const guesUserId = localStorage.getItem("guestId");
    return guesUserId ? JSON.parse(guesUserId) : {};
  }
  return [];
};

const getCartData = () => {
  if (typeof window !== "undefined") {
    const cartData = localStorage.getItem("cartData");
    return cartData ? JSON.parse(cartData) : [];
  }
  return [];
};

const initialState = {
  cartData: getCartData(),
  cartOpen: false,
  checkoutCartItem: getCheckoutDataFromLocalStorage(),
  guestUserId: getGuestUserId(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { items, quantity, cartId, guestId } = action.payload;
      const { id } = items || {};
      const existingItem = state.cartData.find((item) => item.id === id);

      // Store guestId in localStorage if available
      if (guestId) {
        localStorage.setItem("guestId", JSON.stringify(guestId));
      }

      let updatedCartData;

      if (existingItem) {
        // Update quantity if item already exists
        updatedCartData = state.cartData.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        updatedCartData = [
          ...state.cartData,
          {
            quantity,
            cartId,
            ...items,
          },
        ];
      }

      // Store updated cart data in localStorage
      localStorage.setItem("cartData", JSON.stringify(updatedCartData));

      return {
        ...state,
        cartData: updatedCartData,
      };
    },
    setGuestUserId: (state, action) => {
      state.guestUserId = action.payload;
    },
    changeQuantity(state, action) {
      const { items, quantity } = action.payload;
      const { id } = items || {};
      const indexProductId = state.cartData.findIndex((item) => item.id === id);
      if (quantity > 0) {
        state.cartData[indexProductId].quantity = quantity;
      } else {
        state.cartData = state.cartData.filter((item) => item.id !== id);
      }
    },
    removeFromCart: (state, action) => {
      const { items } = action.payload;
      const removeItem = state.cartData?.filter(
        (item) => item?.id !== items?.id
      );
      localStorage.removeItem("cartData");
      return {
        ...state,
        cartData: [...removeItem],
      };
    },
    setOpenCartModal: (state, action) => {
      state.cartOpen = action.payload;
    },
    addGlobalPropsForSingleTask: (state, action) => ({
      ...state,
      globalPropsForSingleTask: action.payload,
    }),
    addTabs: (state, action) => ({ ...state, tabs: action.payload }),
    addCheckoutItemsToStorage: (state, action) => {
      state.checkoutCartItem = action.payload;
      localStorage.setItem("cartData", JSON.stringify(action.payload));
    },
    setDefaultCart: (state) => {
      state.cartData = [];
      state.guestUserId = "";
      state.checkoutCartItem = [];

      localStorage.removeItem("cartData");
      localStorage.removeItem("checkoutItems");
      localStorage.removeItem("guestId");
    },
  },
});

export const {
  addToCart,
  changeQuantity,
  removeFromCart,
  addGlobalPropsForSingleTask,
  setOpenCartModal,
  addCheckoutItemsToStorage,
  setDefaultCart,
  setGuestUserId,
  addTabs,
} = cartSlice.actions;
export default cartSlice.reducer;
