const knex = require('../../database/connection');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const emailExiste = await knex('clientes')
            .where({ email })
            .first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const cpfExiste = await knex('clientes')
            .where({ cpf })
            .first();

        if (cpfExiste) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado' });
        }

        const novoCliente = await  knex('clientes')
            .insert({ 
                nome, 
                email, 
                cpf,
                cep, 
                rua, 
                numero, 
                bairro, 
                cidade, 
                estado 
            })
            .returning('*');

        return res.status(201).json(novoCliente[0]);
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao tentar cadastrar cliente.',
            error: error.message,
        });
    }
};

module.exports = cadastrarCliente;
