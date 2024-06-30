
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define new person Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,

    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        require: true,
    },
    mobile: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    address: {
        type: String,

    },
    salary: {
        type: Number,
        require: true,
    },
    //for authentication(passport-local)
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
})

personSchema.pre('save', async function (next) {
    const person = this;

    //Hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) return next();
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt)

        //overide the plain password with the hashed one
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        //Use bcrypt to compare the provided the password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model('person', personSchema);
module.exports = Person;