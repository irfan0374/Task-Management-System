const express = require('express');
const userRoute = express.Router();
const { userRegistration, loginVerification, UserGoolgleLogin,hello } = require('../Controller/userController');


userRoute.post('/signup', userRegistration);
userRoute.post('/userLogin', loginVerification);
userRoute.post('/googleUserLogin', UserGoolgleLogin);

module.exports = userRoute;

 