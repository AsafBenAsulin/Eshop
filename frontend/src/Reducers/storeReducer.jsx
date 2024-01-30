import { USER_SIGNIN, USER_SIGNOUT, ADD_TO_CART,REMOVE_FROM_CART } from '../Actions.jsx';

const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case USER_SIGNIN: {
      return { ...state, userInfo: payload };
    }
    case USER_SIGNOUT: {
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: ""
        }
      };
    }
    case ADD_TO_CART: {
      const newItem = payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
          item._id === existingItem._id ? newItem : item
        ) 
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case REMOVE_FROM_CART:{
      const cartItems = state.cart.cartItems.filter((Product)=>Product._id != payload._id);
      localStorage.setItem(cartItems,JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    }
    default: return { ...state }

  }
}

export default storeReducer;