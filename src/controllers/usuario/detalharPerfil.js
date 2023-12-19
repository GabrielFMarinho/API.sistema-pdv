const knex = require('../../database/connection');

const detalharPerfil = async (req, res) => {
    try {
        const { id } = req.usuario;

        const perfilUsuario = await knex('usuarios')
            .select('id', 'nome', 'email')
            .where({ id })
            .first();

        return res.status(200).json(perfilUsuario);
    } catch (error) {
        return res
            .status(500)
            .json({
                mensagem: 'Ocorreu um erro ao detalhar o perfil do usuário.',
                erro: error.message,
            });
    }
};

module.exports = detalharPerfil;
