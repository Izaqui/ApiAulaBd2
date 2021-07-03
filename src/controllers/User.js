const connection = require('../database');
const crypto = require('crypto');
module.exports = {
    async index (require, response){
        const ongs = await connection('usuario').select('*');
        return response.json(ongs);
    },
    async create(request, response){
        const { nome, email } = request.body;

    const email = crypto.randomBytes(4).toString('HEX');

    await connection('usuario').insert({
        nome,
        email,
    })
    return response.json({ email });
    }
};