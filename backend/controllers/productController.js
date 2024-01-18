import Product from "../models/Product.js";

const productData = async (req, res) => {

    const products = await Product.find({})
    res.send(products)
};

export default productData