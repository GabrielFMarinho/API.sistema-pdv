const knex = require('../../database/connection');
const buscarCategoria = require('../../services/buscarCategoria.service');
const { enviarArquivo } = require('../../services/s3.service');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { file } = req;

    try {
        const categoriaExiste = await buscarCategoria(categoria_id);

        if (categoriaExiste.length === 0) {
            return res.status(404).json({
                mensagem: 'Categoria não encontrada.',
            });
        }
        let imagem = null;
        if (file) {
            const arquivo = await enviarArquivo(
                `imagens/${file.originalname}`,
                file.buffer,
                file.mimetype,
            );
            imagem = arquivo.url;
        }

        const novoProduto = await knex('produtos')
            .insert({
                descricao: descricao.trim(),
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem: imagem,
            })
            .returning('*');

        return res.status(201).json(novoProduto[0]);
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao tentar cadastrar o produto.',
            error: error.message,
        });
    }
};

module.exports = cadastrarProduto;
