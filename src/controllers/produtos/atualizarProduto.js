const knex = require('../../database/connection');
const buscarCategoria = require('../../services/buscarCategoria.service');
const buscarProduto = require('../../services/buscarProduto.service');
const { enviarArquivo, excluirArquivos } = require('../../services/s3.service');

const atualizarProdutoNoBanco = async ({
    id,
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    produto_imagem,
}) => {
    return knex('produtos')
        .where({ id })
        .update({
            descricao: descricao.trim(),
            quantidade_estoque,
            valor,
            categoria_id,
            produto_imagem,
        })
        .returning('*');
};

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { file } = req;

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: 'ID do produto é inválido.' });
    }

    try {
        const produtoExiste = await buscarProduto(id);

        if (produtoExiste.length === 0) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.',
            });
        }

        const categoriaExiste = await buscarCategoria(categoria_id);

        if (categoriaExiste.length <= 0) {
            return res.status(404).json({
                mensagem: 'Categoria não encontrada.',
            });
        }
        let imagem = produtoExiste[0].produto_imagem;

        if (file) {
            const arquivo = await enviarArquivo(
                `imagens/${file.originalname}`,
                file.buffer,
                file.mimetype,
            );
            if (imagem) {
                const path = produtoExiste[0].produto_imagem.split('/imagens/').reverse();

                await excluirArquivos(`imagens/${path[0]}`);
            }
            imagem = arquivo.url;
        }

        const produtoAtualizado = await atualizarProdutoNoBanco({
            id,
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
            produto_imagem: imagem,
        });

        if (!produtoAtualizado || produtoAtualizado.length === 0) {
            return res.status(500).json({
                mensagem: 'Erro ao atualizar o produto. Nenhuma atualização realizada.',
            });
        }

        return res.status(200).json({
            mensagem: 'Produto atualizado com sucesso.',
            produto: produtoAtualizado,
        });
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro interno ao atualizar o produto.',
            erro: error.message,
        });
    }
};

module.exports = atualizarProduto;
