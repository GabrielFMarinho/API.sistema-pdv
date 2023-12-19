const knex = require('../../database/connection');
const verificarEmailExiste = require('../../services/emailExiste.service');
const bcrypt = require('bcrypt');

const atualizarPerfilUsuario = async (id, nome, email, senha) => {
    return knex('usuarios').where({ id }).update({ nome, email, senha }).returning('*');
};

const editarPerfil = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id: usuarioId, email: usuarioEmail, senha: usuarioSenha } = req.usuario;

    try {
        const usuarioExistente = await verificarEmailExiste(email);

        if (usuarioExistente && usuarioExistente.email !== usuarioEmail) {
            return res
                .status(400)
                .json({
                    mensagem: 'O email informado já está cadastrado para outro usuário.',
                });
        }

        const usuarioAtual = req.usuario;
        const verificarSenha = await bcrypt.compare(senha, usuarioSenha);
        if (
            usuarioAtual.email === email &&
            usuarioAtual.nome === nome &&
            verificarSenha
        ) {
            return res
                .status(200)
                .json({ mensagem: 'Nenhum dado foi alterado no perfil do usuário.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const perfilAtualizado = await atualizarPerfilUsuario(
            usuarioId,
            nome,
            email,
            senhaCriptografada,
        );

        return res.status(201).json(perfilAtualizado[0]);
    } catch (error) {
        return res
            .status(500)
            .json({
                mensagem: 'Ocorreu um erro ao editar o perfil do usuário.',
                erro: error.message,
            });
    }
};

module.exports = editarPerfil;
