const express=require('express');
const path=require('path');
const http=require('http');
const bodyParser=require('body-parser');
//Get our api routes
const api=require('./server/route/api');
const app=express();
//parser of post data
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));
//point static path to dist
app.use(express.static(path.join(__dirname,'dist/secondproject')));
//set our api routes
app.use('/api',api);
//catch all other routes and return the index file
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/secondproject/index.html'));
});
//getting port from environment and store in Express.
const port=process.env.PORT || '3000';
app.set('port',port);
//create HTTP server
//const server=http.createServer(app);
//listening on provided port, on all network interfaces.
app.listen(port,()=>console.log('API running on localhost:'+port))