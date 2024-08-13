const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require("bcrypt")
const user = require('../Model/User_Model')
const securePassword = require('../Utils/securePassword')
const secretKey = process.env.JWT_SECRET_KEY || "your_default_secret_key";

module.exports = {
    userRegistration: async (req, res) => {

        try {

            const { name, email, password } = req.body
            console.log(req.body, "vertna")

            const sPassword = await securePassword(password)
            const exsist = await user.findOne({ email: email })

            if (exsist) {
                return res.status(400).json({ message: "Already registered with this details" })

            } else {
                const User = new user({
                    name: name,
                    email: email,
                    password: sPassword,
                })
                await User.save()

                res.status(201).json({ status: true, message: "User Registered succesfully You can login now" })
            }

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ status: "internal server Error" })
        }
    },

    loginVerification: async (req, res) => {
        try {
            const { email, password } = req.body

            const User = await user.findOne({ email: email })
            if (!User) {
                return res.status(401).json({ message: "User is not Registered" })
            }
            const correctPassword = await bcrypt.compare(password, User.password)
            if (correctPassword) {

                console.log(User.name)
                const token = jwt.sign(
                    { name: User.name, id: User._id, role: "user" },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                console.log(token ,"generate token while logiin")
                res.status(200).json({ User, token, message: `Welcome ${User.name}` })

            } else {

                res.status(400).json({ message: "Password is incorrect" })
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Internal Server Error" })
        }
    },
    UserGoolgleLogin: async (req, res) => {
        try {
            const { userEmail } = req.body
            const registeredUser = await user.findOne({ email: userEmail })
            if (!registeredUser) {
                res.status(400).json({ message: "user is not exists" })
            } else {

                res.status(200).json({ registeredUser, message: `Welcome ${registeredUser.name}` });
            }
        } catch (error) {
            return res.status(500).json({ message: "internal server Error" })
        }
    },
    hello: async (req, res) => {
        try {

            console.log("hello afrid fundaaan")
        } catch (error) {
            console.log(error.message)
        }
    }
}