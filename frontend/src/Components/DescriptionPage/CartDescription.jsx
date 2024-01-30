import React from 'react'
import { Button, Card, Col, PropTypes, Row } from '../../imports'
import ListGroup from "react-bootstrap/ListGroup"
import Badge from 'react-bootstrap/Badge'

const CartDescription = ({ product, addToCart }) => {
    return (
        <Card>
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>${product.price}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                {product.countInStock > 0 ? (
                                    <Badge bg="success">In Stock</Badge>
                                ) : (
                                    <Badge bg="danger">Not in Stock</Badge>
                                )}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <div className="d-grid">
                                {/* <Button onClick={()=>{addToCart()}} variant="primary">Add to Cart</Button> */}
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
CartDescription.propTypes = {
    product: PropTypes.object,
    addToCart: PropTypes.func,
};
export default CartDescription;