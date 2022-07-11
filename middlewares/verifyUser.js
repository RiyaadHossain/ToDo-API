const jwt = require('jsonwebtoken');
const User = require("../src/models/userModel")

const verifyUser = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.find({username: decoded})
        req.name = user[0].name
        req.email = user[0].email
        next()
    } catch (error) {
        next("Opps! Authentication Failed.")
    }
}

module.exports = verifyUser