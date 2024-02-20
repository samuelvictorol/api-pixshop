const sucessoEnum = require('../enums/Sucesso.js');
const errorEnum = require('../enums/Error.js');
const { Product: ProductModel } = require('../models/Product.js')

const productController = {
    create: async (req, res) => {
        try {
            const product = new ProductModel(req.body)
            await product.save().then(() => console.log('Produto criado com sucesso' + JSON.stringify(req.body)))
            res.status(201).send({ success: true, message: sucessoEnum.CREATE_PRODUCT });
        } catch (error) {
            res.status(405).json({message: errorEnum.CREATE_PRODUCT_FAILED})
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const filters = {};
            // Filtrar por nome (se fornecido)
            if (req.query.nome) {
                filters.nomeProduto = { $regex: new RegExp(req.query.nome, "i") }; // Usando regex para busca com ignore case
            }
            // Filtrar por promoção (se fornecido)
            if (req.query.emPromocao === "true") {
                filters.valorPromocional = { $exists: true, $ne: null }; // Produto em promoção tem valor promocional definido e não é nulo
            }
            // Filtrar por valor (se fornecido)
            if (req.query.valorMax && req.query.valorMin) {
                filters.$or = [
                    { valor: { $gte: req.query.valorMin, $lte: req.query.valorMax } },
                    { valorPromocional: { $exists: true, $gte: req.query.valorMin, $lte: req.query.valorMax } }
                ];
            } else if (req.query.valorMax) {
                filters.$or = [
                    { valor: { $lte: req.query.valorMax } },
                    { valorPromocional: { $exists: true, $lte: req.query.valorMax } }
                ];
            } else if (req.query.valorMin) {
                filters.$or = [
                    { valor: { $gte: req.query.valorMin } },
                    { valorPromocional: { $exists: true, $gte: req.query.valorMin } }
                ];
            }
            // Filtrar por estoque (se fornecido)
            if (req.query.stock !== undefined) {
                if (req.query.stock === 'true') {
                    filters.stock = { $gt: 0 }; // Apenas produtos com estoque maior que zero
                } else if (req.query.stock === 'false') {
                    filters.stock = 0; // Apenas produtos com estoque igual a zero
                }
            }
            // Extrair os parâmetros de página e itens por página da req.query
            const page = parseInt(req.query.page) || 1; // Página padrão é 1 se não for fornecida
            const rowsPerPage = parseInt(req.query.rowsPerPage) || 10; // Itens por página padrão é 10 se não for fornecida
            // Calcular o número de documentos para pular
            const skip = (page - 1) * rowsPerPage;
            const totalElements = await ProductModel.countDocuments();
            const totalPages = Math.ceil(totalElements / rowsPerPage);
            const isLastPage = (await ProductModel.countDocuments(filters)) <= (skip + rowsPerPage);
            // Consultar produtos com os filtros e a paginação
            const products = await ProductModel.find(filters).skip(skip).limit(rowsPerPage);
            const pagination = {
                page,
                isLastPage,
                rowsPerPage,
                totalElements,
                totalPages
            };
            res.status(200).send({products, pagination});
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
}


module.exports = productController