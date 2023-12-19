const Joi = require('joi');

const mensagens = {
    'number.base': 'O campo {#label} deve ser um número válido.',
    'number.positive': 'O campo {#label} deve ser um número positivo.',
    'any.required': 'O campo {#label} é obrigatório.',
    'string.empty': `O campo {#label} não pode ser vazio.`,
    'string.max': `O campo {#label} deve conter no máximo {#limit} caracteres.`,
    'array.min': 'O campo {#label} deve conter pelo menos {#limit} item(s).',
};

const schemaPedido = Joi.object({
  cliente_id: Joi.number().required().messages(mensagens),
  observacao: Joi.string().optional().max(255).messages(mensagens),
  pedido_produtos: Joi.array().items(
    Joi.object({
      produto_id: Joi.number().required().messages(mensagens),
      quantidade_produto: Joi.number().min(0).required().messages(mensagens)
    })
  ).min(1).required().messages(mensagens)
});

module.exports = {
    schemaPedido,
};