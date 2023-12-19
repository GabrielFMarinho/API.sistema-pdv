const knex = require('../../database/connection');

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const clienteExiste = await knex('clientes').where({ id }).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        const cliente = await knex('clientes').where({ id }).first();

        return res.status(200).json(cliente);
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro interno ao listar clientes',
            error: error.message,
        });
    }
};

module.exports = detalharCliente;
