const express=require("express");
const crypto=require("crypto")
const axios=require("axios");
const app=express();
const userarr=[];
function generate_token(username,password){
    const input=username+password;
    const hash=crypto.createHash("sha256").update(input).digest("hex");
    return hash;
}
//using middleware
app.use(express.json());
//route - 01 , signin
app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    const token=generate_token(username,password)
    userarr.push({
        username:username,
        password:password,
        token:token
    })
    // async function sendtoken(username,password) {
    //     const token=generate_token(username,password);
    //     const response=await axios.post("https://localhost:3000");
    // }
    res.json({
        message:"you are signed in",
        token:token
    })
})
//route - 02 , signup
app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    const user=userarr.find(u=>u.username===username  && userarr.find(u=>u.password===password));
    if(user){
        res.json({
            message:"login successfull",
            token:generate_token(username,password)
        })
    }
    else{
        res.json({
            message: "either of the username and password is incorrect"
        })
    }
})
app.listen(3000);