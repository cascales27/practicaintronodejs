'use strict';

module.exports = rolNecesario => {
    return (req, res, next) => {

        if (!req.session.usuarioLogado) {
            res.redirect('/login');
            return;
        }

        if (req.session.usuarioLogado.rol !== rolNecesario) {
            res.status(401).send('No tienes permisos para acceder a esta página');
            return;
        }
        next();
    };
}