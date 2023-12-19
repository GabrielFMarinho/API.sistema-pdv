const knex = require('../../database/connection');
const send = require('../../services/emailSend.service');

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
        const cliente = await knex('clientes').where({ id: cliente_id }).first();

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
       
        const produtoIds = pedido_produtos.map(produto => produto.produto_id);

        const produtos = await knex('produtos').whereIn('id', produtoIds);

        if (produtos.length !== pedido_produtos.length) {
            return res.status(404).json({ error: 'Um ou mais produtos não encontrados' });
        }

        for (const produto of pedido_produtos) {
            const produtoDb = produtos.find(p => p.id === produto.produto_id);
            if (produtoDb.quantidade_estoque < produto.quantidade_produto) {
                return res.status(400).json({ error: `Estoque insuficiente para o produto ${produtoDb.descricao}` });
            }
        }

        const valorTotal = pedido_produtos.reduce((total, produtoPedido) => {
            const produtoDb = produtos.find(p => p.id === produtoPedido.produto_id);
            return total + produtoDb.valor * produtoPedido.quantidade_produto;
        }, 0);

        const pedidoId = await knex('pedidos').insert({ cliente_id, observacao, valor_total: valorTotal }).returning('id');

        for (const produto of pedido_produtos) {
            const produtoDb = produtos.find(p => p.id === produto.produto_id);

            const valorProduto = produtoDb.valor * produto.quantidade_produto;

            await knex('produtos').where({ id: produto.produto_id }).decrement('quantidade_estoque', produto.quantidade_produto);

            await knex('pedido_produtos').insert({ pedido_id: pedidoId[0].id, produto_id: produto.produto_id, quantidade_produto: produto.quantidade_produto, valor_produto: valorProduto });
        }

        send(cliente.email, 'Pedido efetuado com sucesso', 'Seu pedido foi efetuado com sucesso!');

        res.status(201).json({ message: 'Pedido cadastrado com sucesso' });
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao tentar cadastrar o pedido.',
            error: error.message,
        });
    }
}

module.exports = cadastrarPedido;