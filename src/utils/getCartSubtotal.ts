export function getCartSubtotal(cartItems: APP.StoreItemTypes[]) {
  const subTotal = cartItems.reduce(
    (accumulator: number, cartItem: APP.StoreItemTypes) => {
      return accumulator + cartItem.price * cartItem.numInCart;
    },
    0
  );
  return subTotal;
}
