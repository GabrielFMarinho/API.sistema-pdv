require('dotenv').config();
const express = require('express');
const rotas = require('./routes/routes');
const cors = require('cors');
const rotasProduto = require('./routes/produto.routes');
const rotasCliente = require('../src/routes/cliente.routes');
const rotasPedido = require('./routes/pedido.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas);
app.use(rotasProduto);
app.use(rotasCliente);
app.use(rotasPedido);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
