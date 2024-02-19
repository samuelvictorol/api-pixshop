const router = require('express').Router();

const productsRouter = require('./products');

router.use('/', productsRouter);

module.exports = router;