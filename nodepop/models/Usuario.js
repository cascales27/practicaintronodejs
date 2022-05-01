'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emaiTransportConfigure = require('../lib/emailTransportConfigure');

const usuarioSchema = mongoose.Schema({
    email: { type :String, unique: true},
    password: String, 
    rol: String,

});

usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
    return bcrypt.hash({ passwordEnClaro }, 7);
}

usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
    return bcrypt.compare({ passwordEnClaro }, this.password);
}


usuarioSchema.methods.enviarEmail = function(asunto, cuerpo) {
    
        const transport = emaiTransportConfigure();

        const result = await transport.sendMail({
            from: process.env.EMAIL_SERVICE_FROM,
            to: this.email,
            subject: asunto,
            html: cuerpo
        });

        console.log("Message sent: %s", result.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    }
    

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;