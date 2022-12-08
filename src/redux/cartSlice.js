import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total = Number(action.payload.price) + Number(state.total);
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      const removeItem = state.products.filter(
        (item) => action.payload.productId !== item.id
      );
      state.products = removeItem;
      state.total = Number(state.total) - Number(action.payload.price);
    },
    removeAllProducts: (state) => {
      state.quantity = 0;

      state.products = [];
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, removeAllProducts } =
  cartSlice.actions;
export default cartSlice.reducer;
