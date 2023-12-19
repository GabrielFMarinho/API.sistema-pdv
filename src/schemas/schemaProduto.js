const joi = require('joi');

const mensagens = {
    'number.base': 'O campo {#label} deve ser um número válido.',
    'number.positive': 'O campo {#label} deve ser um número positivo.',
    'any.required': 'O campo {#label} é obrigatório.',
    'string.empty': `O campo {#label} não pode ser vazio.`,
    'string.max': `O campo {#label} deve conter no máximo {#limit} caracteres.`,
    'number.min': 'O campo {#label} deve ser maior ou igual a zero.',
};

const schemaProduto = joi.object({
    descricao: joi.string().trim().required().max(255).messages(mensagens),
    quantidade_estoque: joi.number().min(0).required().messages(mensagens),
    valor: joi.number().positive().required().messages(mensagens),
    categoria_id: joi.number().positive().required().messages(mensagens),
});

module.exports = {
    schemaProduto,
};
