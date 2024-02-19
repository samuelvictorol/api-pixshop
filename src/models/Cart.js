const mongoose = require('mongoose')
const { Product: ProductModel } = require('../models/Product.js')

const { Schema } = mongoose

const cartSchema = new Schema({
    valor: {
        type: Number,
        required: true,
    },
    usuarioId: {
        type: Number,
        required: true,
    },
    produtos: [ProductModel],
    cupom:{
        type: String,
        required: false,
    },
    },
    { timestamps: true }

)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = {
    Cart,
    cartSchema
}