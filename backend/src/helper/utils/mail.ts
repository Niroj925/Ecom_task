
import { InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

require('dotenv').config();


const sendMail=(email:string,subject:string,msg:string)=>{

  try{
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
        html : msg
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });  
    }
    catch(error){
      throw new InternalServerErrorException(error)
    } 

}



export {sendMail}