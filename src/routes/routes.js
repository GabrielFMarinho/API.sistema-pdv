const express = require('express');
const cadastrarUsuario = require('../controllers/usuario/cadastro');
const loginUsuario = require('../controllers/usuario/login');
const listarCategorias = require('../controllers/categoria/listarCategorias');
const editarPerfil = require('../controllers/usuario/editarPerfil');
const verificarUsuarioLogado = require('../Middlewares/autenticacao');
const validarCampos = require('../Middlewares/validarCampos');
const { schemaUsuario } = require('../schemas/schemaUsuario');
const detalharPerfil = require('../controllers/usuario/detalharPerfil');
const rotas = express();

rotas.post('/usuario', validarCampos(schemaUsuario), cadastrarUsuario);
rotas.post('/login', loginUsuario);
rotas.get('/categoria', listarCategorias);

rotas.use(verificarUsuarioLogado);

rotas.put('/usuario', validarCampos(schemaUsuario), editarPerfil);
rotas.get('/usuario', detalharPerfil);

module.exports = rotas;
