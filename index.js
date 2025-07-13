const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const axios = require("axios");
const cors = require("cors");
const app = express();
const JWT_SECRET = "utkarshpratapsingh";
app.use(cors());
function unique_username(req, res, next) {
    const username = req.body.username;
    if (userarr.find(user => user.username === username)) {
        res.json({
            message:false
        })
    }
    else {
        next();
    }
}
const userarr = [];
// geenrating sha 256 hash
// function generate_token(username,password){
//     const input=username+password;
//     const hash=crypto.createHash("sha256").update(input).digest("hex");
//     return hash;
// }
// using jwt token logic
function generate_token(username, password) {
    const jwt_token = jwt.sign({
        username: username
    }, JWT_SECRET);
    return jwt_token;
}

//using middleware
app.use(express.json());
//route - 01 , signin
app.post("/signup", unique_username, function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    // if (userarr.find(user => user.username === username)) {
    //     res.status(403).send({
    //         message: "username already exists"
    //     })
    // }

    const token = generate_token(username, password)
    userarr.push({
        username: username,
        password: password,
        token: token
    })
    // async function sendtoken(username,password) {
    //     const token=generate_token(username,password);
    //     const response=await axios.post("https://localhost:3000");
    // }
    console.log(userarr);
    res.json({
        message: true
    })



})
//route - 02 , signup
app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const user = userarr.find(u => (u.username === username && u.password === password));
    if (user) {
        res.json({
            message: true,
            token: generate_token(username, password)
        })
    }
    else {
        res.json({
            message: false
        })
    }
})
//route 4
app.get("/me", function (req, res) {
    const token = req.headers.token;
    let username = {};
    try {
        username = jwt.verify(token, JWT_SECRET);
    }
    catch (error) {
        res.status(400).send({
            message: "user not found"
        })
    }

    // console.log(username);
    const user = userarr.find(u => u.username === username.username);
    if (user) {
        res.json({
            message: "sign up successfull"
        })
    }
    else {
        res.sendStatus(400, {
            message: "user not found"
        })
    }

})
app.listen(3000);


