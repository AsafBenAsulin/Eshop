import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from '../Shared/Rating';
import { Store } from '../../store';
import { addToCartHandler } from '../../utils';



const Product = ({ product }) => {
    const {state,dispatch:ctxDispatch} = useContext(Store)
    const {cartItems} = state.cart
    return (
        <Card className='product-card'>
            <Link to={`/product/${product.token}`}>
                <Card.Img variant='top' src={product.image} alt={product.title} />
            </Link>
            <Card.Body className='card-body'>
                <Link to={`/product/${product.token}`}>
                    <Card.Title>{product.title}</Card.Title>
                </Link>
                <Rating rating={product.rating.rate} numReviews={product.rating.count} />
                <Card.Text>${product.price}</Card.Text>
                {product.countInStock === 0 ? <Button variant='light' disabled>Out of stock</Button> :
                    <Button className='btn-primary' onClick={()=>{addToCartHandler(product,cartItems,ctxDispatch)}}>Add to cart</Button>
                }
            </Card.Body>
        </Card>
    )
}
Product.propTypes = { product: PropTypes.object }
export default Product