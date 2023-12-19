const knex = require('../../database/connection');
const verificarEmailExiste = require('../../services/emailExiste.service');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailExiste = await verificarEmailExiste(email);

        if (emailExiste) {
            return res
                .status(400)
                .json({
                    mensagem: 'Já existe usuário cadastrado com o e-mail informado.',
                });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await knex('usuarios')
            .insert({ nome, email, senha: senhaCriptografada })
            .returning('*');

        return res.status(200).json(novoUsuario[0]);
    } catch (error) {
        return res
            .status(500)
            .json({ mensagem: 'Erro interno no servidor', erro: error.message });
    }
};

module.exports = cadastrarUsuario;
