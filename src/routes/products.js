const router = require('express').Router();
const productController = require('../controllers/productController');

router.route('/products')
    .post((req, res) => productController.create(req, res))
    .get((req, res) => productController.getAllProducts(req, res));

router.delete('/products/:id', (req, res) => productController.removeProduct(req, res));

module.exports = router;