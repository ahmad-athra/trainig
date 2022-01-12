const express = require('express'); // express is a function 
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
});








const app = express();
const DataBase = require('./dataBase'); // required the exported database class 
// making an object of Database
const db = new DataBase(); // new instance/object of Database 

app.use(cors()); // cors allows us to make api calls out of range of our server
//app.use(bodyParser.json()); // json is the format of file when we send data for api 
//app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.post('/newtask', (req, res) => {

    const body = req.body;
    console.log('body : ', body);
    db.addTask(body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

app.get('/gettasks', (req, res) => {



    db.getTasks()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});


app.get('/getonetask/:id', (req, res) => {

    const { id } = req.params;

    db.getTaskById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});



app.delete('/deletetask/:id', (req, res) => {

    const { id } = req.params;

    db.deleteTaskById(id)
        .then(data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })

});


app.put('/updatetask/:id', (req, res) => {

    const { id } = req.params;
    newInfo = req.body;

    db.updateTaskById(id, newInfo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

app.post('/sendEmail', (req, res) => {

    neededInfo = req.body;
    let mailOptions = {
        from: 'ghufrandali1999@gmail.com',
        to: neededInfo.email,
        subject: neededInfo.subject,
        text: neededInfo.text,
        attachments: [
            { path: neededInfo.imgUrl }
        ]
    }

    console.log(neededInfo.imgUrl);
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log("error");
        } else {
            console.log("it is working");
            res.send("done");
        }
    })





})




const port = 4000;

app.listen(port, () => {
    console.log(`server has started on port ${port}...`);
    // connect to db when server started
    db.connect();
});