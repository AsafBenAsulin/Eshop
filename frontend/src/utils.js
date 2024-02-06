import { ADD_TO_CART } from "./Actions";
import axios from "axios";

const getError = (error) => {
    return error.message && error.response.data.message ? error.response.data.message : error.message
}
const addToCartHandler = async (product, cartItems, ctxDispatch) => {

    const existedItem = cartItems.find((x) => x._id === product._id);
    const quantity = existedItem ? existedItem.quantity + 1 : 1;

    try {
        const { data } = await axios.get(`/api/v1/product/${product._id}`);

        if (data.countInStock < quantity) {
            alert('Sorry, Product is out of stock');
            return;
        }
        ctxDispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });

    } catch (err) {
        ctxDispatch({ type: GET_FAIL, payload: err.message });
    }
}

const getFilterURI = (searchFromURI, filter, skipPathName) => {
    const defaultParams = {
        category: 'all',
        query: 'all',
        price: 'all',
        rating: 'all',
        order: 'newest',
        page: 1
    };

    const searchParams = new URLSearchParams(searchFromURI);
    const params = Object.fromEntries(searchParams);

    const mergedParams = { ...defaultParams, ...params, ...filter };
    const queryString = new URLSearchParams(mergedParams).toString();
    const pathName = skipPathName ? "" : "/search";

    return `${pathName}?${queryString}`;
};

export { getError, addToCartHandler, getFilterURI }