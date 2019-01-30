var exp=require('express');
var app=exp();
var bodyparser=require('body-parser');
//importing bcypt
var bcrypt=require('bcryptjs');
//for getting profile with user name
var s;
var sk='secret key';
var jwt=require('jsonwebtoken');
//to convert string id into object id
var mongoose=require('mongoose');

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

app.post('/home/register',(req,res,next)=>{
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
                        var jwtBearerToken=jwt.sign({userid:req.body.userid},sk,{expiresIn:3600});
                        console.log('token is'+jwtBearerToken);
                        res.status(200).json({idToken:jwtBearerToken,info:'login success as admin'});
                    }
                    else if(success===true&&data[0].category==="student")
                    {
                        var jwtBearerToken=jwt.sign({userid:req.body.userid},sk,{expiresIn:3600});
                        console.log('token is'+jwtBearerToken);
                        res.status(200).json({idToken:jwtBearerToken,info:'login success as student'});
                    }
                    else{
                        res.json('wrong password');
                    }
                })
            }
        }
    })
})

//validation of token
let checkToken=(req,res,next)=>{
    //capture headers with names 'x-access-token' or 'authorization-token'
    //Express headers are auto converterd to lowercase
    let token=req.headers['x-access-token'] || req.headers['authorization'];
    if(token==undefined)
    {
        return res.json({message:'no token found'})
    }
    if(token.startsWith('Bearer '))
    {
        //remove bearer from string
        token=token.slice(7, token.length);
        console.log('slicing '+token);
        
    }
    //using jwt package and secret string, validate the token.
    if(token!==undefined) {
        jwt.verify(token,sk,(err,decoded)=>{
            //if anything goes wrong, return an error immediately before passing control to next
            if(err)
            {
            return res.json({message:'token is not valid'})
            }
                else{
                    req.decoded=decoded;
                    next();
                }
            
        })
    }
}


app.get('/admin/adminprofile',checkToken,(req,res,next)=>{
    dbo.collection('registration').find({userid:req.decoded.userid}).toArray((err,data)=>{
        if(err)
        {
            res.send("session expired");
        }
        else{
            res.send(data);
        }
    })
})


app.post('/admin/adminnotifications',checkToken,(req,res,next)=>{
    dbo.collection('notifications').insertOne(req.body,(err,success)=>{
        if(err)
        {
            console.log('error in adding notification');
        }
        else{
            res.json('notification added succesfully');
        }
    })
})


app.post('/admin/adminresults',checkToken,(req,res,next)=>{
    dbo.collection('results').insertOne(req.body,(err,success)=>{
        if(err)
        {
            console.log('error in adding results');
        }
        else{
            res.json('results added succesfully');
        }
    })
})


app.get('/admin/adminnotifications',checkToken,(req,res,next)=>{
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


app.get('/admin/adminresults',checkToken,(req,res,next)=>{
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

app.get('/student/studentprofile',checkToken,(req,res,next)=>{
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

app.get('/student/studentnotifications',checkToken,(req,res,next)=>{
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


app.get('/student/studentresults',checkToken,(req,res,next)=>{
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



//admin notifications update operation
app.put('/admin/adminnotifications',checkToken,(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting string id into objectid
    console.log(req.body._id);
    var objectid=new mongoose.Types.ObjectId(req.body._id);
    console.log(objectid);
    //updating document in database
    dbo.collection('notifications').update({_id:objectid},{$set:{notification:req.body.notification,date:req.body.date}},(err,success)=>
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            dbo.collection('notifications').find({}).toArray((err,data)=>
            {
                if(err)
                {
                    console.log('problem in sending')
                }
                else{
                    res.json(data);
                }
            })
        }
    })
})

//admin results update operation
app.put('/admin/adminresults',checkToken,(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting string id into objectid
    console.log(req.body._id);
    var objectid=new mongoose.Types.ObjectId(req.body._id);
    console.log(objectid);
    //updating document in database
    dbo.collection('results').update({_id:objectid},{$set:{sname:req.body.sname,
                                                           english:req.body.english,
                                                           physics:req.body.physics,
                                                           chemistry:req.body.chemistry,
                                                           enggdrawing:req.body.enggdrawing,
                                                           maths:req.body.maths    
                                                        }},(err,success)=>
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            dbo.collection('results').find({}).toArray((err,data)=>
            {
                if(err)
                {
                    console.log('problem in sending')
                }
                else{
                    res.json(data);
                }
            })
        }
    })
})

//delete operation for admin notifications
app.delete('/admin/adminnotifications',checkToken,(req,res)=>{
    dbo.collection('notifications').remove({notification:req.body.notification},(err,success)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.json('deleted successfully')
        }
    })
})


//delete operation for admin results
app.delete('/admin/adminresults',checkToken,(req,res)=>{
    dbo.collection('results').remove({sname:req.body.sname},(err,success)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.json('deleted successfully')
        }
    })
})


//updating adminprofile
app.put('/admin/adminprofile',checkToken,(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting string id into objectid
    console.log(req.body._id);
    var objectid=new mongoose.Types.ObjectId(req.body._id);
    console.log(objectid);
    //updating document in database
    dbo.collection('registration').update({_id:objectid},{$set:{firstname:req.body.firstname,
                                                           middlename:req.body.middlename,
                                                           lastname:req.body.lastname,
                                                           email:req.body.email,
                                                           dob:req.body.dob,
                                                           gender:req.body.gender    
                                                        }},(err,success)=>
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            dbo.collection('registration').find({}).toArray((err,data)=>
            {
                if(err)
                {
                    console.log('problem in updating')
                }
                else{
                    res.json(data);
                }
            })
        }
    })
})


//updating adminprofile
app.put('/student/studentprofile',checkToken,(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting string id into objectid
    console.log(req.body._id);
    var objectid=new mongoose.Types.ObjectId(req.body._id);
    console.log(objectid);
    //updating document in database
    dbo.collection('registration').update({_id:objectid},{$set:{firstname:req.body.firstname,
                                                           middlename:req.body.middlename,
                                                           lastname:req.body.lastname,
                                                           email:req.body.email,
                                                           dob:req.body.dob,
                                                           gender:req.body.gender,
                                                           branch:req.body.branch    
                                                        }},(err,success)=>
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            dbo.collection('registration').find({}).toArray((err,data)=>
            {
                if(err)
                {
                    console.log('problem in updating')
                }
                else{
                    res.json(data);
                }
            })
        }
    })
})

module.exports=app;

// app.listen(process.env.PORT || 8080,()=>{
//     console.log('server is listening on port 8080.....')
// })