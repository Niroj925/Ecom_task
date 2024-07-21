"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
require('dotenv').config();
const sendMail = (email, subject, msg) => {
    try {
        var transporter = nodemailer.createTransport({
            host: 'lifesumai.cloud',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASS
            }
        });
        var mailOptions = {
            from: `"Dietplan" <${process.env.MAIL}>`,
            to: email,
            subject: subject,
            html: msg
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(error);
    }
};
exports.sendMail = sendMail;
//# sourceMappingURL=mail.js.map