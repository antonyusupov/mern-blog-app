
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization Token required!'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        // There must me sent username to display and assign blogs!!!
        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
    }
}

module.exports = requireAuth