const joi = require('joi');

const mensagens = {
    'string.base': 'O campo {#label} deve ser um texto válido',
    'any.required': 'O campo {#label} é obrigatório',
    'string.empty': `O campo {#label} não pode ser vazio`,
    'string.email': 'O campo {#label} precisa ter um formato de email válido',
    'string.min': `O campo {#label} deve conter no mínimo {#limit} caracteres`,
};

const schemaUsuario = joi.object({
    nome: joi.string().trim().required().messages(mensagens),
    email: joi.string().trim().email().required().messages(mensagens),
    senha: joi.string().trim().required().min(5).messages(mensagens),
});

module.exports = {
    schemaUsuario,
};
