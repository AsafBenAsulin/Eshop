import React from 'react'
import { Button, Col, Link, PropTypes, Row } from '../../imports';
import MessageBox from '../Shared/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';

const ItemsInCart = ({ cartItems, updateCartHandler, removeItemHandler }) => {
    return (
        <div>
            {cartItems.length === 0 ? <MessageBox>Your cart is empty. <Link to="/">Go back to HomePage</Link></MessageBox> :
                <ListGroup>
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item._id} className='mt-2 border'>
                            <Row className='d-flex align-items-center'>
                                <Col md={3}>
                                    <img src={item.image} alt={item.title} className='img-fluid rounded img-thumbnail' style={{border:"0"}} />
                                </Col>
                                <Col md={5}>
                                    <Link to={`/product/${item.token}`} >{item.title}</Link>
                                </Col>
                                <Col md={2}>
                                    <Button onClick={() => updateCartHandler(item, item.quantity - 1)} disabled={item.quantity === 1} variant='light'>
                                        <i className='fa fa-minus-circle' />
                                    </Button>
                                    {" "}
                                    <span>
                                        {item.quantity}
                                    </span>
                                    {" "}
                                    <Button onClick={() => updateCartHandler(item, item.quantity + 1)} variant='light'>
                                        <i className='fa fa-plus-circle' />
                                    </Button>
                                </Col>
                                <Col md={1}>
                                    ${item.price}
                                </Col>
                                <Col md={1}>
                                    <Button variant='light' onClick={() => removeItemHandler(item)}>
                                        <i className='fas fa-trash' />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>}
        </div>
    )
}

ItemsInCart.propTypes = {
    cartItems: PropTypes.array,
    updateCartHandler: PropTypes.func,
    removeItemHandler: PropTypes.func,
};
export default ItemsInCart