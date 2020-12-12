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
    case 'clearCart':
    return {
        carts: [],
        userId: ""
    };
    default:
      return state;
  }
}
