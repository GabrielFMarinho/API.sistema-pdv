-- Criação do banco de dados
CREATE DATABASE pdv

DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS categorias;

CREATE TABLE usuarios (
	id serial PRIMARY KEY,
  	nome VARCHAR(255) NOT NULL,
  	email VARCHAR(255) NOT NULL UNIQUE,
  	senha VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
	id serial PRIMARY KEY,
  	descricao VARCHAR(255)
);

INSERT INTO categorias (descricao) VALUES
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');


CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    quantidade_estoque INT,
    valor INT,
    categoria_id INT
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    cpf VARCHAR(11) UNIQUE,
    cep VARCHAR(8),
    rua VARCHAR(255),
    numero INT,
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(2)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id VARCHAR(255),
    observacao TEXT,
    valor_total INT
);
  
CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id),
    produto_id INT REFERENCES produtos(id),
    quantidade_produto INT,
    valor_produto INT
);

ALTER TABLE produtos
ADD COLUMN produto_imagem TEXT;