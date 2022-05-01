'use strict';

const nodemailer = require('nodemailer');

module.exports = async function() {

    const testAcount = await nodemailer.createTestAccount();

    const developConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: testAcount.user,
            pass: testAcount.pass
        }
    };

    const transport = nodemailer.createTransport(developConfig);

    return transport;
};