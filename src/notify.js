/**
 * Created by StarkX on 19-Jan-18.
 */
const nodeMailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');

const transporter = nodeMailer.createTransport({
    service : 'gmail',
    auth : {
        user : xConfig.mail.email,
        pass : xConfig.mail.password
    }
});
const htmlTemplate = handlebars.compile(fs.readFileSync('static/Notify.html', { encoding : 'utf-8' }));

module.exports = (eventName, people) => {
    "use strict";
    let Request = [];
    people.forEach((person) => {
        let replacements = {
            appName : xConfig.appName,
            name : people.name,
            event : eventName,
        };
        let options = {
            from : xConfig.mail.email,
            to : person.email,
            subject : eventName + ' Reminder',
            html : htmlTemplate(replacements)
        };
        
        Request.push(new Promise((resolve, reject) => {
            transporter.sendMail(options, (err, info) => {
                resolve(err);
            }).catch((e) => {
            })
        }));
    });
    return Promise.all(Request)
};