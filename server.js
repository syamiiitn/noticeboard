var exp=require('express');
var app=exp();
var bodyparser=require('body-parser');
//importing bcypt
var bcrypt=require('bcryptjs');
//for getting profile with user name
var s;
//to convert string id into object id
//var mongoose=require('mongoose');

//getting mongodb client object
var mongoclient=require('mongodb').MongoClient;
var dbo;
var url="mongodb://admin:admin1234@ds119734.mlab.com:19734/noticeboard";

//connect with noticeboard.db
mongoclient.connect(url,(err,client)=>{
    if(err)
    {
        console.log('error in database connection')
    }
    else {
        //get object of noticeboard database
        dbo=client.db('noticeboard');
        console.log('connected with database');
    }
})


var path=require('path');
app.use(bodyparser.json());


app.use(exp.static(path.join(__dirname,'dist/secondproject')));

app.post('/register',(req,res,next)=>{
    dbo.collection('registration').find({userid:req.body.userid}).toArray((err,data)=>{
        //if user not found insert user document/data
        if(data.length===0)
        {
            bcrypt.hash(req.body.password,10,(err,hashcode)=>{
                if(err)
                {
                    console.log('err during hashing');
                }
                else{
                    dbo.collection('registration').insertOne(
                        {
                            firstname:req.body.firstname, 
                            middlename:req.body.middlename,
                            lastname:req.body.lastname,
                            email:req.body.email,
                            userid:req.body.userid,
                            password:hashcode,
                            dob:req.body.dob,
                            gender:req.body.gender,
                            branch:req.body.branch, 
                            category:req.body.category
 
                        } ,()=>{
                            res.json("registered successfully")
                        } )
                }
            })

        }
        //if user is existed, send response to client to choose another username
        else{
            res.json("userid existed.. choose another userid..")
        }
    })

})




app.post('/home/login',(req,res,next)=>{
    s=req.body.userid;
    dbo.collection('registration').find({userid:req.body.userid}).toArray((err,data)=>{
        if(err)
        {
            console.log('error is'+err);
        }
        else{
            if(data.length===0)
            {
                res.json("userid not existed")
            }
            else{
                //if password matched then true is assigned to success, else false
                bcrypt.compare(req.body.password,data[0].password,(err,success)=>{
                    if(err)
                    {
                        console.log('err is '+err);
                    }
                    else if(success===true&&data[0].category==="admin"){
                        res.json('login success as admin');
                    }
                    else if(success===true&&data[0].category==="student")
                    {
                        res.json('login success as student');
                    }
                    else{
                        res.json('wrong password');
                    }
                })
            }
        }
    })
})



app.get('/admin/adminprofile',(req,res,next)=>{
    dbo.collection('registration').find({userid:s}).toArray((err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})


app.post('/admin/adminnotifications',(req,res,next)=>{
    dbo.collection('notifications').insertOne(req.body,(err,success)=>{
        if(err)
        {
            console.log('error in adding notification');
        }
        else{
            res.send('notification added succesfully');
        }
    })
})


app.post('/admin/adminresults',(req,res,next)=>{
    dbo.collection('results').insertOne(req.body,(err,success)=>{
        if(err)
        {
            console.log('error in adding results');
        }
        else{
            res.send('results added succesfully');
        }
    })
})


app.get('/admin/adminnotifications',(req,res,next)=>{
    dbo.collection('notifications').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})


app.get('/admin/adminresults',(req,res,next)=>{
    dbo.collection('results').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})

app.get('/student/studentprofile',(req,res,next)=>{
    dbo.collection('registration').find({userid:s}).toArray((err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})

app.get('/student/studentnotifications',(req,res,next)=>{
    dbo.collection('notifications').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})


app.get('/student/studentresults',(req,res,next)=>{
    dbo.collection('results').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})



//update operation
// app.put('/admin/adminnotifications',(req,res)=>{
//     //object received from client
//     console.log(req.body);
//     //converting string id into objectid
//     console.log(req.body._id);
//     var objectid=new mongoose.Types.ObjectId(req.body._id);
//     console.log(objectid);
//     //updating document in database
//     dbo.collection('notifications').update({_id:objectid},{$set:{notification:req.body.notification,date:req.body.date}},(err,success)=>
//     {
//         if(err)
//         {
//             console.log(err)
//         }
//         else
//         {
//             dbo.collection('notifications').find({}).toArray((err,data)=>
//             {
//                 if(err)
//                 {
//                     console.log('problem in sending')
//                 }
//                 else{
//                     res.json(data);
//                 }
//             })
//         }
//     })
// })




app.listen(process.env.PORT || 8080,()=>{
    console.log('server is listening on port 8080.....')
})