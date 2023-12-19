const validarCampos = joinSchema => async (req, res, next) => {
    try {
        await joinSchema.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
    next();
};

module.exports = validarCampos;
