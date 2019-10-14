var express = require('express')
var app = express()
const port = 5432
var cors = require('cors')
var bodyParser = require('body-parser')
var multer = require('multer')
const nodemailer = require('nodemailer')

const mysql = require('mysql')
const db = mysql.createConnection({
    user:'root',
    password: 'password',
    database: 'moviepurwadhika',
    host: 'localhost'
})



app.use(bodyParser.json())
app.use(cors())



// Fungsi-fungsi untuk table Manage Movies

app.get('/', (req,res)=>{
    res.send(`<h1>Welcome to My Homepage</h1>`)
})

app.get('/getlist', (req, res)=>{
    db.query(`select * from movies`, (err, result)=>{
        try{
            if(err) throw err
            res.send(result)
        }catch(err){
            console.log(err);
            
        }
    })
})


app.get('/getmovie', (req, res)=>{
    db.query(`select * from movies where nama = '${req.query.nama}' and tahun = ${req.query.tahun} `, (err, result)=>{
        try{
            if(err) throw err
            res.send(result)
        }catch(err){
            console.log(err);
        }
    })
})

app.post('/addmovie', (req, res)=>{
    db.query(`insert into movies values (0, '${req.body.nama}', ${req.body.tahun}, '${req.body.description}')`, (err, result)=>{
        try{
            if(err) throw err
            res.send(result)
        }catch(err){
            console.log(err);
        }
    })
})

app.delete('/deletemovie/:id', (req, res)=>{
    db.query(`delete from movies where id = ${req.params.id} `, (err, result)=>{
        try{
            if(err) throw err
            res.send(result)
        }catch(err){
            console.log(err);
        }
    })
})

app.put('/updatemovie', (req, res)=>{
    db.query(`
        update movies
        set nama = '${req.body.nama}', tahun = ${req.body.tahun}, description = '${req.body.description}'
        where id = ${req.body.id}
    
    `, (err, result)=>{
        try{
            if(err) throw err
            res.send(result)
        }catch(err){
            console.log(err);
        }
    })
})



// Fungsi-fungsi utk table Manage Categories

app.post('/addcategory', (req, res)=>{
    db.query(`insert into movies values (0, '${req.body.nama}')`, (err, result)=>{
        try{
            if(err) throw err
            res.send(result)
        }catch(err){
            console.log(err);
        }
    })
})

app.delete('/deletecategory/:id', (req, res)=>{
    db.query(`delete from categories where id = ${req.params.id} `, (err, result)=>{
        try{
            if(err) throw err
            res.send(result)
        }catch(err){
            console.log(err);
        }
    })
})

app.put('/updatecategory', (req, res)=>{
    db.query(`
        update categories
        set nama = '${req.body.nama}'
        where id = ${req.body.id}
    
    `, (err, result)=>{
        try{
            if(err) throw err
            res.send(result)
        }catch(err){
            console.log(err);
        }
    })
})



// Fungsi-fungsi untuk table Connection List




app.listen(port, console.log("Listening in port "+port))