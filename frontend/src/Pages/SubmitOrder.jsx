import React, { useContext, useState } from 'react'
import { Store } from '../store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import CheckOutSteps from '../Components/Shared/CheckOutSteps';
import Title from '../Components/Shared/Title';

const SubmitOrder = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { cart, userInfo } = state;
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!cart.paymentMethod)
            navigate("/payment");

    }, []);

    const submitOrderHandler = async () => {
        try {
            setLoading(true);
            //Post request addOrder
            //Delete cartItems from state and localStorage
            //go to orderDetails page /id of order
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setLoading(false);
        }
    }

    const round2 = (number) => Math.round(number * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    );
    cart.taxPrice = round2(cart.itemsPrice * 0.17);
    cart.shippingPrice =
        cart.itemsPrice > 50
            ? round2(cart.itemsPrice * 0.1)
            : round2(cart.itemsPrice * 0.02);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    return (
        <div>
            {/* <Title title="Submit Order"/>
            <CheckOutSteps step1 step2 step3 step4/> */}
        </div>
    )
}

export default SubmitOrder