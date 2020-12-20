const initialState = {
    carts: [],
    userId: ""
};

export function cart(state = initialState, action) {

  switch (action.type) {
    case 'addToCart':
      
      return {
        ...state,
        carts: [...state.carts, action.course]
      };
    case 'removeFromCart':
      const {id} = action;
      const carts = state.carts.filter(cart => cart.id !== id);
      
      return {
        ...state,
        carts
      };
    case 'clearCart':
    return {
        carts: [],
        userId: ""
    };
    default:
      return state;
  }
}
