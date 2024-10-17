const express =require('express');
const app = express();


const users =[
    {username:'shreyash',email:'shreyashchavan0656@gmail.com',age:21,location:'pune',active_status: true},
    {username:'rohan',email:'rohan96@gmail.com',age:21,location:'Nanded',active_status: false},
];

app.get('/api/users/profile',(req,res)=>{
    const {username,age,location,active_status} = req.query;
    let user = users.find(u=> u.username === username);

    if(!user){
        return res.status(404).json({error:'user not found'});
    }

    if(age) user = user.age == age ? user:null;
    if(location) user = user.location == location ? user:null;
    if(active_status) user = user.active_status == (active_status == 'true');

    if(user){
        res.json(user);
    }
    else{
        res.status(404).json({error: 'user not found'});
    }
});

const port = 3000;

app.listen(port,()=> console.log(`server running on port ${port}`))