const express = require('express')

const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(bodyParser.urlencoded({extended : true}))

const connectionstring = "mongodb+srv://murali94409:murali1234@cluster0.ubv1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(connectionstring,{useunifiedtopology:true})
 .then(client => {
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
        quotesCollection.find().toArray()
        .then(result=>{
            console.log(result)
        })     
          .catch(error=>console.log(error))
    })


}).catch(console.error)

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

const PORT = 3000

app.listen(PORT,(res,req) => {
    console.log(`server running at port: ${PORT}`)
})