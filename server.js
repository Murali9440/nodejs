const express = require('express')

const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient

const app = express

app.use(bodyParser.urlencoded({extended : true}))

const connectionstring = "mongodb+srv://murali9440:Pavithra123@cluster0.ubv1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(mconnectionstring,{useunifiedtopology: true})
 .then(client =>{
     console.log('connected to database')
     const db = client.db('star-war-quotes')
     const quotesCollection = db.collection('quotes')

     //post data
     app.post('/quotes',(req,res)=>{
         quotesCollection.insertOne(req.body)
         .then(result =>{
             console.log(result)
        })
         .catch(error=> console.error(error))
    })

    //get data
    app.get('/getall',(req,res)=>{
        db.collection('quotes').find().toArray()
         .then(result=>{
             
           res.render('index.ejs',{quotes:result})
         })
        .catch(error=>console.error(error))
       })


}).catch(console.error)

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

const PORT = 5000

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})