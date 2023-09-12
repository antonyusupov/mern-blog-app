const User = require('../models/userModel');
const jToken = require('jsonwebtoken')

const createToken = (_id) => {
    return jToken.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const loginUser = async (req, res) => {
    const { email, password} = req.body 

    try {
        const user = await User.login( email, password )
        const username = await user.username

        const token = createToken(user._id)

        res.status(200).json({ username, email, token})
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const user = await User.signup( username, email, password )

        const token = createToken(user._id)

        res.status(200).json({username, email, token})
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {loginUser, signupUser};