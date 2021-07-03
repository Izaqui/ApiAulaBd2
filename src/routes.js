const express = require('express');

//const User = require('./controllers/User');
const UserController = require('./controllers/UserController');

//const connection = require('./database');

const routes = express.Router();

//routes.get('/profile',User.index);

routes.get('/usuario', UserController.index);
routes.post('/usuario', UserController.create);
routes.delete('usuario/:email', UserController.delete);


module.exports = routes;