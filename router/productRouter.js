import express from 'express'
import ProductModel from '../model/product.js';

const router = express.Router();
/*
    USAGE : Get all the products
    URL:http://127.66.77.88:5000/product/all
    Method:Get
    Fields:no-fields
*/

// Get All Products
router.get("/all", async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
});

/*
    USAGE : Create a product
    URL:http://127.66.77.88:5000/product/create
    Method:post
    Fields:name,image,price,qty,info
*/

// Create Product
router.post("/create", async (request, response) => {
    try {
        const new_Product = {
            name: request.body.name,
            image: request.body.image,
            price: request.body.price,
            qty: request.body.qty,
            info: request.body.info
        }
        const verifyProduct = await ProductModel.findOne({ name: new_Product.name });
        if (verifyProduct) {
            return response.status(401).json({
                result: "Product is already exists"
            })
        }

        const product = await ProductModel(new_Product);
        console.log(product);
        const saveProduct = await product.save();
        response.status(200).json({
            result: "Product Created Successfully.",
            productDetails: product
        })
    } catch (err) { }
})


/*
    USAGE : Get the single product
    URL:http://127.66.77.88:5000/product/:id
    Method:Get
    Fields:no-fields
*/

// Get Single Product
router.get("/:id", async (req, res) => {
    try {
        const product_Id = req.params.id
        const product = await ProductModel.findById(product_Id);
        res.status(200).json({
            result: "Single Product",
            productDetails: product
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: err.message
        })
    }
})

/*
    USAGE : Update product
    URL:http://127.66.77.88:5000/product/:id
    Method:put
    Fields:name,image,price,qty,info
*/


// Update Product
router.put("/:id", async (request, response) => {
    try {
        const updatedProduct = {
            name: request.body.name,
            image: request.body.image,
            price: request.body.price,
            qty: request.body.qty,
            info: request.body.info
        }
        const product_Id = request.params.id;
        const product = await ProductModel.findById(product_Id);
        if (!product) {
            return response.status(401).json({
                result: "Product not found!"
            })
        }
        const updateProduct = await ProductModel.findByIdAndUpdate(product_Id, { $set: updatedProduct }, { new: true });
        response.status(200).json({
            result: "Updated Successfully",
            productDetails: updateProduct
        })
    } catch (err) {
        console.log(err);
        response.status(500).json({
            msg: err.message
        })
    }
})


/*
    USAGE : delete the product
    URL:http://127.66.77.88:5000/product/:id
    Method:delete
    Fields: no-fields
*/

// Delete Product 
router.delete("/:id", async (req, res) => {
    try {
        const product_Id = req.params.id;
        const product = await ProductModel.findById(product_Id);
        if (!product) {
            res.status(401).json({
                result: `No products with this id:${product_Id} `
            })
        }
        const delProduct = await ProductModel.findByIdAndDelete(product_Id);
        res.status(200).json({
            result: `Deleted Succssfully.`,
            productDetails: delProduct
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: err.message
        })
    }

})


export default router 