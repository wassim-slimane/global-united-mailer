const express = require('express');
const cors = require('cors');
const {sendEmail} = require("./mailer");
const {checkConnection} = require("./checkConnection");
const {sanitizeForm} = require("../lib/formUtils");

// Constants
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.get('/mailer', (req, res) => res.send('Mailer App Running!'));

app.use('/mailer/api/check-connection', (req, res, next) => {
    checkConnection().then(() => res.status(200).send('Connection Checked')).catch(next);
});

// Routes
app.post('/mailer/api/contact', (req, res, next) => {
    const form = req.body;
    //const sanitizedForm = sanitizeForm(form);

    sendEmail(form).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err.message);
    });
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(3000, () => {
    console.log(`Listening...`);
});
