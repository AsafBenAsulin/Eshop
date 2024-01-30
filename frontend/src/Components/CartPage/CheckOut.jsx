import React from 'react'
import { Button, Card, PropTypes } from '../../imports';
import ListGroup from 'react-bootstrap/ListGroup';

const CheckOut = ({ cartItems }) => {
    return (
        <Card>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item>
                        <h3>Subtotal:
                            {" ("}{cartItems.reduce((a, c) => a + c.quantity, 0)}
                            {" "}
                            {cartItems.Length === 1 ? "Item" : "Items"}
                            {") "}
                            ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(2)}
                        </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='d-grid'>
                            <Button type="button" variant='primary' disabled={cartItems.length===0}>
                                Check Out
                            </Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

CheckOut.propTypes = {
    cartItems: PropTypes.array
};
export default CheckOut