const knex = require('../../database/connection');

const listarProdutos = async (req, res) => {
    try {
        const { categoria_id } = req.query;

        let query = knex('produtos').select('*');

        if (!categoria_id) {
            const products = await query;

            res.status(200).json(products);
        } else {
            query = query.where('categoria_id', categoria_id);
            const products = await query;

            res.status(200).json(products);
        }


    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar produtos', error: error.message });
    }
};

module.exports = listarProdutos;