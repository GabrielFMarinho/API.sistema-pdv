const express = require('express');
const cadastrarCliente = require('../controllers/clientes/cadastrarCliente');
const validarCampos = require('../Middlewares/validarCampos');
const { schemaCliente } = require('../schemas/schemaCliente');
const verificarUsuarioLogado = require('../Middlewares/autenticacao');
const editarDadosCliente = require('../controllers/clientes/editarDadosCliente');
const listarClientes = require('../controllers/clientes/listarClientes');
const detalharCliente = require('../controllers/clientes/detalharCliente');

const rotasCliente = express();

rotasCliente.use(verificarUsuarioLogado);
rotasCliente.post('/cliente', validarCampos(schemaCliente), cadastrarCliente);
rotasCliente.put('/cliente/:id', validarCampos(schemaCliente), editarDadosCliente);
rotasCliente.get('/cliente', listarClientes);
rotasCliente.get('/cliente/:id', detalharCliente);

module.exports = rotasCliente;
