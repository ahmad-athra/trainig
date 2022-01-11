const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

let mailOptions = {
    from: 'ghufrandali1999@gmail.com',
    to: 'mnjoudeh@gmail.com',
    subject: 'test',
    text: 'it is working '
}


transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
        console.log("error");
    } else {
        console.log("it is working");
    }
})