
var jwt = require('jsonwebtoken');

/** VERIFICACION DE TOQUEN */
const SEED = 'invite.online';

exports.verificationToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.currentUser = decoded.user;

        next();
    })

}