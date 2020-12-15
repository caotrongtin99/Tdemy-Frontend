export const cartActions = {
  addToCart,
  clearCart,
  removeFromCart
};

function addToCart(course) {
    debugger
  return (dispatch) => dispatch({ type: 'addToCart', course });
}

function removeFromCart(id) {
  debugger
return (dispatch) => dispatch({ type: 'removeFromCart', id });
}

function clearCart(course) {
  return { type: 'clearCart', course };
}

 