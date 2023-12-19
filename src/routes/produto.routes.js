const express = require('express');
const cadastrarProduto = require('../controllers/produtos/cadastrarProduto');
const validarCampos = require('../Middlewares/validarCampos');
const { schemaProduto } = require('../schemas/schemaProduto');
const verificarUsuarioLogado = require('../Middlewares/autenticacao');
const atualizarProduto = require('../controllers/produtos/atualizarProduto');
const listarProdutos = require('../controllers/produtos/listarProdutos');
const detalharProduto = require('../controllers/produtos/detalharProduto');
const excluirProduto = require('../controllers/produtos/excluirProduto');
const multerConfig = require('../utils/multerConfig');

const rotasProduto = express();

rotasProduto.use(verificarUsuarioLogado);
rotasProduto.post(
    '/produto',
    multerConfig.single('imagem'),
    validarCampos(schemaProduto),
    cadastrarProduto,
);
rotasProduto.put(
    '/produto/:id',
    multerConfig.single('imagem'),
    validarCampos(schemaProduto),
    atualizarProduto,
);
rotasProduto.get('/produto', listarProdutos);
rotasProduto.get('/produto/:id', detalharProduto);
rotasProduto.delete('/produto/:id', excluirProduto);

module.exports = rotasProduto;
