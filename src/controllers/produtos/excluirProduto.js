const knex = require('../../database/connection');
const buscarProduto = require('../../services/buscarProduto.service');
const { excluirArquivos } = require('../../services/s3.service');

const verificarProdutoAssociadoPedido = async produtoId => {
    const pedidoAssociado = await knex('pedido_produtos')
        .where('produto_id', produtoId)
        .first();
    return !!pedidoAssociado;
};

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: 'ID do produto é inválido.' });
    }

    try {
        const produtoExiste = await buscarProduto(id);

        if (produtoExiste.length === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        const associadoPedido = await verificarProdutoAssociadoPedido(id);
        if (associadoPedido) {
            return res.status(400).json({
                mensagem:
                    'Esse produto está associado a um pedido. Não pode ser excluído.',
            });
        }

        if (produtoExiste[0].produto_imagem) {
            const path = produtoExiste[0].produto_imagem.split('/imagens/').reverse();

            await excluirArquivos(`imagens/${path[0]}`);
        }

        await knex('produtos').where({ id }).del();

        return res.status(200).json({ mensagem: 'Produto deletado com sucesso.' });
    } catch (error) {
        return res
            .status(500)
            .json({ mensagem: 'Erro ao tentar excluir o produto', error: error.message });
    }
};

module.exports = excluirProduto;
