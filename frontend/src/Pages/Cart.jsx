import React, { useContext } from 'react'
import { Store } from '../store';
import Title from '../Components/Shared/Title';
import { Col, Row, axios, toast } from '../imports';
import ItemsInCart from '../Components/CartPage/ItemsInCart';
import CheckOut from '../Components/CartPage/CheckOut';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../Actions';
import { getError } from '../utils';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems } = cart;
    const navigate = useNavigate();

    const updateCartHandler = async (product, quantity) => {
        try {
            const { data } = await axios.get(`/api/v1/product/${product._id}`);

            if (data.countInStock < quantity) {
                alert('Sorry, Product is out of stock');
                return;
            }
            ctxDispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });

        } catch (err) {
            toast.error(getError(err));
        }

    }

    const removeItemHandler = async (product) => {
        ctxDispatch({ type: REMOVE_FROM_CART, payload: product });
    }

    const checkoutHandler = () => {
        navigate("/signin?redirect=/shipping");
    }

    return (
        <div>
            <Title title={"My shopping cart"} />
            <Row>
                <Col md={8}>
                    <ItemsInCart cartItems={cartItems} updateCartHandler={updateCartHandler} removeItemHandler={removeItemHandler}></ItemsInCart>
                </Col>
                <Col md={4} className='mt-2' style={{position:'fixed',right: 15}}>
                    <CheckOut cartItems={cartItems} checkoutHandler={checkoutHandler}></CheckOut>
                </Col>
            </Row>

        </div>
    )
}

export default Cart