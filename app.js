const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { email, phoneNumber, name, surname, password } = req.body;
    console.log(`Email: ${email}\nPhone number: ${phoneNumber}\nName: ${name}\nSurname: ${surname}\nPassword: ${password}`);

    if (!email || !phoneNumber || !name || !surname || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = { email, phoneNumber, name, surname, password };

    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) throw err;

        const users = JSON.parse(data || '[]');
        users.push(user);

        fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) throw err;
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
    res.status(201).json({ message: 'User registered successfully' });

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
