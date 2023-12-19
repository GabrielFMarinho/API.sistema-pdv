const knex = require('../database/connection');

const verificarEmailExiste = async email => {
    try {
        const usuario = await knex('usuarios').where({ email }).first();
        return usuario;
    } catch (error) {
        throw new Error('Erro ao verificar email: ' + error.message);
    }
};

module.exports = verificarEmailExiste;
