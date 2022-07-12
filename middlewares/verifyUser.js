const jwt = require('jsonwebtoken');
const User = require("../src/models/userModel")

const verifyUser = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token);
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({username: decoded})
        // console.log(user);
        req.userId = user._id
        req.email = user.email
        next()
    } catch (error) {
        next("Opps! Authentication Failed.")
    }
}

module.exports = verifyUser