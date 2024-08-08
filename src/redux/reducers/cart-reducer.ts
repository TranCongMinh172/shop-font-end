import { createSlice } from '@reduxjs/toolkit'
import { CartItemModel } from '../../model/cart-item.model'
import { getCartLocalStorage } from '../../utils/cart-handle'
export type Cart ={
  items : CartItemModel[],
}

const initialState: Cart = {
  items: getCartLocalStorage()
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartState: (state) =>{
        state.items = getCartLocalStorage();
    }
  },
})


export const { updateCartState } = cartSlice.actions

export default cartSlice.reducer