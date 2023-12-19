const knex = require('../../database/connection');

const listarCategorias = async (req, res) => {
    try {
        const categorias = await knex('categorias').select('*');

        return res.status(200).json(categorias);
    } catch (error) {
        return res
            .status(500)
            .json({ mensagem: 'Erro interno no servidor', erro: error.message });
    }
};

module.exports = listarCategorias;
