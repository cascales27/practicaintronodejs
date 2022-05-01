'use strict';

const jwt = require('jsonwebtoken');
const { Usuario } = require('./models');

class LoginController {
    index(req, res, next) {
        res.locals.email = '';
        res.locals.error = '';
        res.render('login');
    }

    async post(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log(email, password);

            const usuario = await Usuario.findOne({ email });

            if (!usuario || !(await usuario.comparePassword(password))) {
                res.locals.email = email;
                res.locals.error = res.__('Usuario o contraseña incorrectos');
                res.render('login');
                return;
            }

            req.session.usuarioLogado = {
                _id: usuario._id,
                rol: usuario.rol
            };

            const result = await usuario.enviarEmail('Bienvenido', 'Bienvenido a NodePop');
            res.redirect('/privado');
        } catch (error) {
            next(error);

        }
    }

    logout(req, res, next) {
        req.session.regenerate(err => {
            if (err) {
                next(err);
                return;
            }
            res.redirect('/');
        });
    }

    async postJWT(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log(email, password);

            const usuario = await Usuario.findOne({ email });

            if (!usuario || !(await usuario.comparePassword(password))) {
                res.json({ error: 'Usuario o contraseña incorrectos' });

                return;
            }
            jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET,
                { expiresIn: '1d' }, (err, jwtToken) => {
                    next(err);
                    return;

                });


            res.json({ token: jwtToken });
        } catch (error) {
            next(error);

        }
    }

}
module.exports = LoginController;