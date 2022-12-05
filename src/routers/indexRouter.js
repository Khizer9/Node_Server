const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    const user = req.query.user;

    res.send(user + "!");
})

const users = [];

router.post("/create_user", (req, res) => {
    const {user} = req.body;

    user.push({username: user.username, password: user.password});

    res.json({loggedIn: true, status: "Everything went well"});
});

router.get("/users", (req, res) => {
    res.json(users);
})

router.delete("/delete", (req, res)=>{
    const {username, password} = req.body
    const existingUser = users.find(u => u.username === username && u.password === password);
    console.log(existingUser);

    if(!existingUser){
        res.statusCode(401).json({errorStatus: "Credentials did not match"});
    }

    users.splice(users.indexOf(existingUser), 1);
    res.json(users);
});

module.exports = router;