const knex = require('../database/connection');

const buscarProduto = async id => {
    try {
        const produto = await knex('produtos').where({ id });
        return produto;
    } catch (error) {
        throw new Error('Erro ao buscar produto: ' + error.message);
    }
};

module.exports = buscarProduto;
