const router = require('express').Router()

const productController = require('../controllers/productController');

router
    .route('/products')
    .post((req, res) => productController.create(req, res))
    .get((req, res) => productController.getAllProducts(req, res))

module.exports = router