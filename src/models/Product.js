const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
    valor: {
        type: Number,
        required: true,
    },
    valorPromocional: {
        type: Number,
        required: false,
    },
    nomeProduto:{
        type: String,
        required: true
    },
    descricaoProduto:{
        type: String,
        required: true,
    },
    quantidade:{
        type: Number,
        required: true,
    },  
    stock:{
        type: Number,
        required: true
    },
    imgProduct:{
        type: String,
        required: true
    },
    },
    { timestamps: true }

)

const Product = mongoose.model('Product', productSchema)

module.exports = {
    Product,
    productSchema
}