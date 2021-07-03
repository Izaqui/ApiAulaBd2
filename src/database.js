require('dotenv').config();

const {Client} = require('pg');
const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});
const getUser = (request, response) =>{
    client.query('SELECT * FROM usuario', (error, results) => {
        if(error){
            response.status(400).send(error);
            return;
        }
        response.status(200).json(results.rows);
    });
}
    
const add = (request, response) =>{
    const {nome,email} = request.body;
    
    client.query(`INSERT INTO usuario (nome, email) VALUES ($1, $2)`, 
        [nome,email],(error, results) =>{
        if(error){
            response.status(400).send(error);
            return;
        }
        response.status(200).send('Insert User');
    });
};
    
const up = (request, response) => {
        
    const { nome, email } = request.body;
      
    client.query(
        'UPDATE usuario SET nome = $1 WHERE email=$2',
            [nome, email],
            (error, results) => {
            if (error) {
                response.status(400).send(error);
                return;
            }
        response.status(200).send('Upgrade User');
    });
};
    
const delet = (request, response) => {
    const id = parseInt(request.params.id)
      
    client.query('DELETE FROM usuario WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(400).send(error);
            return;
        }
        response.status(200).send('User Delete');
    });
};

module.exports = {
    getUser,
    add,
    up,
    delet
};