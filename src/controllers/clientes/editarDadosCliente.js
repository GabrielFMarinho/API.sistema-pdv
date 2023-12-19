const knex = require('../../database/connection');

const editarDadosCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const clienteExiste = await knex('clientes').where({ id }).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        const outroClienteComMesmoEmail = await knex('clientes')
            .where({ email })
            .andWhere('id', '<>', id)
            .first();

        if (outroClienteComMesmoEmail) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }
       
        const outroClienteComMesmoCpf = await knex('clientes')
            .where({ cpf })
            .andWhere('id', '<>', id)
            .first();

        if (outroClienteComMesmoCpf) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado' });
        }

        const dadosClienteAtualizado = await knex('clientes')
            .where({ id })
            .update({
                nome,
                email,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado,
            })
            .returning('*');

        if (!dadosClienteAtualizado || dadosClienteAtualizado === 0) {
            return res.status(500).json({
                mensagem:
                    'Erro ao atualizar os dados do cliente. Nenhuma atualização realizada.',
            });
        }

        return res.status(200).json({
            mensagem: 'Atualização realizada com sucesso.',
            dados: dadosClienteAtualizado,
        });
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro interno ao atualizar dados do cliente.',
            error: error.message,
        });
    }
};

module.exports = editarDadosCliente;
