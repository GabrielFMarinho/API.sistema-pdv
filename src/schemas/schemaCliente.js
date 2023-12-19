const joi = require('joi');

const mensagens = {
    'string.base': 'O campo {#label} deve ser um texto válido',
    'any.required': 'O campo {#label} é obrigatório',
    'string.empty': `O campo {#label} não pode ser vazio`,
    'string.email': 'O campo {#label} precisa ter um formato de email válido',
    'string.min': `O campo {#label} deve conter no mínimo {#limit} caracteres`,
    'string.max': `O campo {#label} deve conter no máximo {#limit} caracteres`,
    'string.pattern.base': `O campo {#label} deve conter apenas números`,
    'string.length': `O campo {#label} deve conter exatamente {#limit} caracteres`,
    'number.base': 'O campo {#label} deve ser um número',
};

const schemaCliente = joi.object({
    nome: joi.string()
        .trim()
        .required()
        .messages(mensagens),
    email: joi.string()
        .trim()
        .email()
        .required()
        .messages(mensagens),
    cpf: joi.string()
        .trim()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required()
        .messages(mensagens),
    cep: joi.string()
        .trim()
        .length(8)
        .pattern(/^[0-9]+$/)
        .messages(mensagens),
    rua: joi.string()
        .max(255)
        .messages(mensagens),
    numero: joi.number()
        .integer()
        .messages(mensagens),
    bairro: joi.string()
        .max(255)
        .messages(mensagens),
    cidade: joi.string()
        .max(255)
        .messages(mensagens),
    estado: joi.string()
        .length(2)
        .messages(mensagens),
    
});

module.exports = {
    schemaCliente,
}