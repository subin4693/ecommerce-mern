const express = require('express');
const productController = require("../Controllers/productController")
const verify = require("../Utils/Verifytoken");


const router = express.Router();

router.route('/admin').post(verify.verifyToken,productController.createProduct)
                        .delete(verify.verifyToken,productController.deleteProduct)
                        .put(verify.verifyToken,productController.updateProductDetails)

router.route('/').get(productController.getAllProducts);

router.route('/:id').get(productController.getSingleProducts);

router.route('/cart/carts').post(verify.verifyToken,productController.addtoCart)
                        .delete(verify.verifyToken, productController.deleteCart)
                        .get(verify.verifyToken, productController.getAllCarts)

router.route("/order/orders").post(verify.verifyToken,productController.buyProduct)
                        .get(verify.verifyToken,productController.getLatestTransaction)

router.route("/orders/get-orders").get(verify.verifyToken,productController.getAllPurcheasedProducts);
module.exports = router;