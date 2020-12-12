export const cartActions = {
  addToCart,
  clearCart
};

function addToCart(course) {
    debugger
  return (dispatch) => dispatch({ type: 'addToCart', course });
}

function clearCart(course) {
  return { type: 'clearCart', course };
}

 