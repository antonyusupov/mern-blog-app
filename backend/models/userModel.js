const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    username : {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function ( username, email, password ) {
    // Check for fields not empty
    if(!username || !email || !password ) {
        throw Error('All fields must be filled')
    }
    // Check for valid email
    if(!validator.isEmail(email)) {
        throw Error('Not valid email')
    }
    // Check for strong password
    if(!validator.isStrongPassword(password)) {
        throw Error('Not strong password')
    }

    const emailExists = await this.findOne({ email })
    const usernameExists = await this.findOne({ username })
    const checkBoth = await emailExists || usernameExists

    if(checkBoth) {
        if(usernameExists) {
            throw Error ('Username already in use!')
        }
        if(emailExists) {
            throw Error('Email already in use')
        }
    }


  

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, email,  password: hash })

    return user
}


// login 

userSchema.statics.login = async function (email, password) {
    if(!email || !password) {
        throw Error(`Fields must be filled! ${email}, ${password}`)
    }

    const user = await this.findOne({email})
    if(!user) {
        throw Error('User not found')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Wrong password!')
    }

    return user
}

module.exports = mongoose.model('User', userSchema);