const express = require('express');
const path = require('path');
const UserData = require('./db/connection');

const app = express();

const port = process.env.PORT || 3000 ;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const public_path = path.join(__dirname, "../public");

app.use(express.static(public_path));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/index', (req, res) => {
    res.render('index');
})

const ifcorrect =  async (req) => {
    const result = await UserData.find({$and: [{email: req.body.email}, {password: req.body.password}]}).countDocuments();
    if(result > 0){
        return true;
    }
    return false;
}

const ifpresent =  async (req) => {
    const result = await UserData.find({email: req.body.email}).countDocuments();
    if(result > 0){
        return true;
    }
    return false;
}

app.post('/register', async (req, res) => {
    try {
        if(await ifpresent(req) === true){
            res.render('error', {message: 'Already Registered'});
        }
        if(req.body.password === req.body.confirmPassword){
            const newUser = new UserData({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            const registered = await newUser.save();
            res.status(201).render('musicplayer');
        }
        else{
            res.render('error', {message: 'Password didnt match'});
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
})


app.post('/login', async (req, res) => {
    try {
        const result = await ifcorrect(req);
        if(result === true){
            let result = await UserData.find({$and: [{email: req.body.email}, {password: req.body.password}]});
            res.status(201).render('musicplayer');
        }
        else {
            res.render('error', {message: 'Wrong Credential'});
        } 
    }
    catch(err) {
        console.log(err);
    }
    
})

app.get('/error', (req, res) => {
    res.render('error');
})

app.get('/Ampify', (req, res) => {
res.render('musicplayer');
})

app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
});