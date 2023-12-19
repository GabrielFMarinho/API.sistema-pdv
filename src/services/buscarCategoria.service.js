const knex = require('../database/connection');

const buscarCategoria = async id => {
    try {
        const categoria = await knex('categorias').where({ id });
        return categoria;
    } catch (error) {
        throw new Error('Erro ao buscar a categoria: ' + error.message);
    }
};

module.exports = buscarCategoria;
