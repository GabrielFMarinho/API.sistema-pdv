const express = require('express');
const validarCampos = require('../Middlewares/validarCampos');
const { schemaPedido } = require('../schemas/schemaPedido');
const verificarUsuarioLogado = require('../Middlewares/autenticacao');
const cadastrarPedido = require('../controllers/pedidos/cadastrarPedido');
const listarPedidos = require('../controllers/pedidos/listarPedidos');

const rotasPedido = express();

rotasPedido.use(verificarUsuarioLogado);
rotasPedido.post('/pedido', validarCampos(schemaPedido), cadastrarPedido);
rotasPedido.get('/pedido', listarPedidos);

module.exports = rotasPedido;