require('dotenv').config();
const redis = require("redis");

const servico = require('../index')
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

client.on("connect", function(error){
    console.log("Conectado!");
});

client.on("error", function(error){
    console.log(error);
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
    
    
// Add key
 client.set("Teste", JSON.stringify(getUser), function(err,resp){
     if(err) throw err;
     console.log(resp);
 });

// search key
 client.get("Teste", function(err, reply){
     if(reply != null){
        const teste = JSON.parse(reply.toString());
         console.log(teste);
     }else{
         console.log("key not exist's");
     }
 });

// Remove key
 client.del("Teste", function(err, resp){
     if(err) throw err;
     console.log(resp);
 });

// Setando com tempo de vida
client.setex("Teste", 7200, JSON.stringify(obj), function(err, resp){
    if(err) throw err;
    console.log(resp);
}); 