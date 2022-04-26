'use strict';

const { Usuario } = require('./models');

class LoginController {
    index(req, res, next){
        res.locals.email = '';
        res.locals.error = '';
        res.render('login');
    }

    async post(req, res, next){
      try {
        const { email, password } = req.body;
        console.log(email, password);

        const usuario = await Usuario.findOne({ email });

        if (!usuario || !(await usuario.comparePassword (password))) {
            res.locals.email = email;
            res.locals.error = res.__('Usuario o contraseña incorrectos');
            res.render('login');
            return;
        }

        req.session.usuarioLogado = {
            _id: usuario._id,
            rol: usuario.rol
        };
        res.redirect('/privado'); 
        }catch (error) {
            next(error);
            
        }
    }    
}
module.exports = LoginController;