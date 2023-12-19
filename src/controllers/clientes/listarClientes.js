const knex = require('../../database/connection');

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes').select('*');

        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro interno ao listar clientes',
            error: error.message,
        });
    }
};

module.exports = listarClientes;
