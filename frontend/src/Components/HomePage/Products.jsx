import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from './Product.jsx'

const Products = ({products}) => {
  return (
    <Row>
        {products.map((product)=>(
            <Col key={product.token} lg={3} md={4} sm={6} xs={12}>
                <Product product={product}/>
            </Col>
        ))}
    </Row>
  )
}

export default Products