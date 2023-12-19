const knex = require('../../database/connection');

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;
    let pedidos;
    try {
        if (cliente_id) {
            pedidos = await knex('pedidos').where({ cliente_id });
        } else {
            pedidos = await knex('pedidos').select('*');
        }

        const resultado = await Promise.all(pedidos.map(async pedido => {
            const pedidoProdutos = await knex('pedido_produtos')
                .select('*')
                .where('pedido_id', pedido.id);
      
            return {
              pedido,
              pedido_produtos: pedidoProdutos
            };
          }));
      
          res.status(200).json(resultado);
        
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao tentar listar pedidos.',
            error: error.message,
        });
    }
}

module.exports = listarPedidos;