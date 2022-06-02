const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {db} = require('./model/dbConnection');
const res = require('express/lib/response');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//read db user
app.get("/api/readData", (req, res) =>{
    const sqlQuery = "SELECT * from user";

    db.query(sqlQuery, (err, result) =>{
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        else{
            res.send(result);
            console.log(result);

        }
    });
});

//read by user email
app.get('/api/readUser/:user_email', (req, res) =>{
    const userEmail = req.params.user_email;

    const sqlQuery = "SELECT * FROM user WHERE user_email = ?";
    db.query(sqlQuery, userEmail, (err, result) =>{
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        else{
            res.send(result);
            console.log(result);

        }
    });
});

//create akun (register)
app.post("/api/createUser", (req, res) =>{
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;

    const sqlQuery = "INSERT INTO user (user_email, user_name, user_password) VALUE (?, ?, ?)";
    db.query(sqlQuery, [userName, userEmail, userPassword], (err, result) =>{
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        else{
            res.send(result);
            console.log(result);
        }
    });
});

//login
app.get("/api/loginUser", (req, res) =>{
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;
    const sqlQuery = "SELECT * FROM `user` WHERE `user_email` LIKE '" + userEmail + "' AND `user_password` LIKE '" + userPassword + "'";
    
    db.query(sqlQuery, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        
        if (rows.length < 1) {
            return res.status(404).json({
                message: "login gagal periksa kembali email dan password",
                methode: req.method,
                url: req.url,
            });
        }
        
        res.json({
            status: "OK",
            message: "login berhasil",
            data: rows,
            methode: req.method,
            url: req.url,
        });
    });
});
    
//update register
app.put("/api/updateUser", (req, res) =>{
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;

    const sqlQuery = "UPDATE user SET user_name = ?, user_password = ? WHERE user_email = ?";
    db.query(sqlQuery, [userName, userPassword, userEmail], (err, result) =>{
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        else{
            res.send(result);
            console.log(result);
        }
    });
});

//create profile
app.post("/api/createProfile", (req, res) =>{
    const userPhoto = req.body.user_photo;
    const userAddress = req.body.user_address;
    const userFirstname = req.body.user_firstname;
    const userLastname = req.body.user_lastname;
    const userDate = req.body.user_date;
    const userCity = req.body.user_city;
    const userNumber = req.body.user_number;

    const sqlQuery = "INSERT INTO user (user_photo, user_address, user_firstname, user_lastname, user_date, user_city, user_number) VALUE (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlQuery, [userPhoto, userAddress, userFirstname, userLastname, userDate, userCity, userNumber], (err, result) =>{
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        else{
            res.send(result);
            console.log(result);
        }
    });
});

//update profile
app.put("/api/updateProfile", (req, res) =>{
    const userPhoto = req.body.user_photo;
    const userAddress = req.body.user_address;
    const userFirstname = req.body.user_firstname;
    const userLastname = req.body.user_lastname;
    const userDate = req.body.user_date;
    const userCity = req.body.user_city;
    const userNumber = req.body.user_number;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;

    const sqlQuery = "UPDATE user SET user_photo = ?, user_address = ?, user_firstname = ?, user_lastname = ?, user_date = ?, user_city = ?, user_number = ? WHERE user_email = ?";
    db.query(sqlQuery, [userPhoto, userAddress, userFirstname, userLastname, userDate, userCity, userNumber, userEmail], (err, result) =>{
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        else{
            res.send(result);
            console.log(result);
        }
    });
});


//read db pickup
app.get("/api/readDatapickup", (req, res) =>{
    const sqlQuery = "SELECT * from pickup";

    db.query(sqlQuery, (err, result) =>{
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        else{
            res.send(result);
            console.log(result);

        }
    });
});

//delete
app.delete("/api/deleteUser", (req, res) =>{
    const userId = req.body.user_id;

    const sqlQuery = "DELETE FROM user WHERE user_id = ?";
    db.query(sqlQuery, userId, (err, result) =>{
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        else{
            res.send(result);
            console.log(result);
        }
    });
});

//read db sell
app.get("/api/readDatasell", (req, res) =>{
    const sqlQuery = "SELECT * from sell";
    db.query(sqlQuery, (err, result) =>{
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        else{
            res.send(result);
            console.log(result);

        }
    })
})

app.get('/', (req, res) =>(
    res.send('Server running...')
));

app.listen('5000', '0.0.0.0' () =>{
    console.log('server is running in port 5000');
});