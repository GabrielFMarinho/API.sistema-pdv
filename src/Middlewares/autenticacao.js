const jwt = require('jsonwebtoken');
const knex = require('../database/connection');

const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res
            .status(401)
            .json({
                mensagem:
                    'Para acessar este recurso, um token de autenticação válido deve ser enviado.',
            });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.SENHA_JWT);

        const usuario = await knex('usuarios').where('id', id).first();

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Ocorreu um erro ao verificar o token de autenticação.',
        });
    }
};

module.exports = verificarUsuarioLogado;
