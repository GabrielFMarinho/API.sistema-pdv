const knex = require('../../database/connection');
const buscarProduto = require('../../services/buscarProduto.service');

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: 'ID do produto é inválido.' });
    }

    try {
        const produtoExiste = await buscarProduto(id);

        if (produtoExiste.length === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }
        return res.status(200).json(produtoExiste[0]);
    } catch (error) {
        return res
            .status(500)
            .json({ mensagem: 'Erro ao detahar o produto', error: error.message });
    }
};

module.exports = detalharProduto;
