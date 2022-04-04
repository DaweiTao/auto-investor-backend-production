const express = require("express");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const User = require("../models/user");
// const conf = require("../env/config")

const authRouter = express.Router();

authRouter.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 16)
        .then(passwordHash => {
            const user = new User({
                email: req.body.email,
                password: passwordHash,
                avatarSrc: req.body.avatarSrc,
                username: req.body.username
            })
            return user.save()
        })
        .then(result => {
            res.json({
                success: true,
                message: "User created!",
            })
            console.log("User created: ")
            console.log(result);
        })
        .catch(err => {
            res.json({
                success: false,
                message: "User creation failed!",
                error: err
            })
        })
})

function generateToken(uid, email){
    const token = jwt.sign(
        {uid: uid, email: email},
        process.env.AUTH_KEY,
        {expiresIn: process.env.EXPIRES_IN}
    )
    return token
}

function extractUserProfile(userDoc){
    return {
        uid: userDoc.uid,
        email: userDoc.email,
        username: userDoc.username,
        avatarSrc: userDoc.avatarSrc,
        role: userDoc.role,
        createdAt: userDoc.createdAt,
        updatedAt: userDoc.updatedAt,
    }
}

authRouter.post("/login", (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(userDoc => {
            if (!userDoc) {
                res.json({
                    success: false,
                    message: "Login failed! User not found. Please check your email and password.",
                })
                return
            }

            bcrypt.compare(req.body.password, userDoc.password).then(compareResult => {
                if (!compareResult) {
                    res.json({
                        success: false,
                        message: "Password incorrect!"
                    }) 
                    return
                }

                // generate a token and send it back to the user
                res.json({
                    success: true,
                    message: "Login Success!",
                    userProfile: extractUserProfile(userDoc),
                    token: generateToken(userDoc.uid, userDoc.email),
                }) 
    
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: "Login failed!",
                err: err
            })
        })

})

module.exports = authRouter;