const knex = require('../../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verificarEmailExiste = require('../../services/emailExiste.service');

const realizarAutenticacao = async (usuario, senha) => {
    try {
        const verificarSenha = await bcrypt.compare(senha, usuario.senha);

        if (!usuario || !verificarSenha) {
            throw new Error('Erro ao autenticar usuário: ' + error.message);
        }

        const { senha: _, ...usuarioLogado } = usuario;
        return usuarioLogado;
    } catch (error) {
        throw new Error('Erro ao autenticar usuário: ' + error.message);
    }
};

const gerarToken = usuario => {
    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_JWT, {
        expiresIn: '1d',
    });
    return token;
};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const emailExiste = await verificarEmailExiste(email);
        console.log(emailExiste);
        if (!emailExiste) {
            return res.status(400).json({ mensagem: 'Usuário ou senha inválida' });
        }

        const usuarioLogado = await realizarAutenticacao(emailExiste, senha);

        const token = gerarToken(usuarioLogado);

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ mensagem: 'Usuário ou senha inválida' });
    }
};

module.exports = loginUsuario;
