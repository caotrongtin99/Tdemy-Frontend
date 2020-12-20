export const cartActions = {
  addToCart,
  clearCart,
  removeFromCart
};

function addToCart(course) {
  console.log("========course =============", course);
  return (dispatch) => dispatch({ type: 'addToCart', course });
}

function removeFromCart(id) {
return (dispatch) => dispatch({ type: 'removeFromCart', id });
}

function clearCart(course) {
  return { type: 'clearCart', course };
}

 