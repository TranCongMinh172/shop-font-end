import { CartItemModel } from "../model/cart-item.model";

export const getCartLocalStorage = (): CartItemModel[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

export const checkExistInCard = (item: CartItemModel) => {
    const cart = getCartLocalStorage();
    const existingItem = cart.find((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);

    if (existingItem) {
        // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
        existingItem.quantity += item.quantity;
    } else {
        // Nếu sản phẩm không tồn tại, thêm vào giỏ hàng
        cart.push(item);
    }

    // Cập nhật localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}
export const addCartLoacalStorage = (item : CartItemModel) =>{
    checkExistInCard(item);
}
export const updateItemCart = (item: CartItemModel) => {
    const cart = getCartLocalStorage();
    const filter = cart.filter((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
    if(filter.length > 0) {
        filter[0].quantity = item.quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}
export const removeItemCart = (item: CartItemModel) => {
    const cart = getCartLocalStorage();
    const index = cart.findIndex((c) => c.productDetail.id === item.productDetail.id);
    if(index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}
