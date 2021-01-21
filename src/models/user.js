const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt= require('bcrypt');
const { user } = require('../routers/authRouters');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter valid name'],
        trim: true
    },
    email: {
        type: String,
        unique: [true, 'Email already exist'],
        required: [true, 'Please enter valid email'],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        trim: true,
        minlength: [6, 'Password too small'],
    }
});

// Fire a function before user is created
userSchema.pre('save', async function(next){
    const salt= await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login= async function(email, password){
    const user= await this.findOne({ email });

    if(user){
        const auth= await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error("Incorrect Password");
    }
    throw Error("Email is not registered");
}

const User= mongoose.model('User',userSchema)
module.exports= User