// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const http = require('http');
//const res = require('express/lib/response');
http.createServer((req,res)=>{
    res.send('first app');
});
const port = 8000;
app.listen(port,'127.0.0.1',()=>{
    console.log(`server running on port ${port}`)
});


// Callback function to complete GET '/all'
app.get('/all',(req, res)=>{
    res.send(projectData);
    console.log(projectData);
    
})
// POST method route

app.post('/add', (req, res)=>{
    projectData ={
        date:req.body.date,
        temp:req.body.temp,
        city:req.body.city,
        content:req.body.content,
        icon:req.body.icon,
        feel:req.body.feel
    }   
    
    console.log(projectData);
});

