import React from 'react'
import { Card, Col, Link, PropTypes, Row } from '../../imports';
import MessageBox from './MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';

const OrderSummery = ({ cart, status, isDelivered }) => {
    return (
        <>
            <Card className='mb-3'>
                <Card.Header>
                    <Card.Title>
                        Shipping Address
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>Name: </strong>
                        {cart.shippingAddress.fullName}<br />
                        <strong>Address: </strong>
                        {cart.shippingAddress.address}<br />
                        <strong>City: </strong>
                        {cart.shippingAddress.city}<br />
                        <strong>Postal code: </strong>
                        {cart.shippingAddress.postalCode}<br />
                        <strong>Country: </strong>
                        {cart.shippingAddress.country}<br />
                    </Card.Text>
                    {
                        status === "submitOrder" ? <Link to="/shipping">Edit</Link> :
                            isDelivered ? <MessageBox variant="danger">Not Sent</MessageBox> :
                                <MessageBox variant="success">sent</MessageBox>
                    }
                </Card.Body>
            </Card>
            <Card className='mb-3'>
                <Card.Header>
                    <Card.Title>
                        Payment Method
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </Card.Text>
                    {
                        status === "submitOrder" ? <Link to="/payment">Edit</Link> :
                            status === "details-unpaid" ? <MessageBox variant="danger">Not Paid</MessageBox> :
                                <MessageBox variant="success">Paid</MessageBox>
                    }
                </Card.Body>
            </Card>
            <Card className='mb-3'>
                <Card.Header>
                    <Card.Title>
                        Items
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup>
                        {cart.cartItems.map((item) => (
                            <ListGroup.Item key={item._id} className='mt-2 border'>
                                <Row className='d-flex align-items-center'>
                                    <Col md={3}>
                                        <img src={item.image} alt={item.title} className='img-fluid rounded img-thumbnail' style={{ border: "0" }} />
                                    </Col>
                                    <Col md={5}>
                                        <Link to={`/product/${item.token}`} >{item.title}</Link>
                                    </Col>
                                    <Col md={2}>
                                        <strong>Quantity: </strong><span>{item.quantity}</span>
                                    </Col>
                                    <Col md={2}>
                                        <span>{item.price}$</span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    {
                        status === "submitOrder" && <Link to="/cart">Edit</Link>
                    }
                </Card.Body>
            </Card>
        </>
    )
}

OrderSummery.propTypes = {
    cart: PropTypes.object,
    status: PropTypes.string,
    isDelivered: PropTypes.bool,
};
export default OrderSummery