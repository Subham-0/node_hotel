const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require('./models/person')


passport.use(new LocalStrategy(async (UserName, password, done) => {
    //your authentication logic
    try {
        // console.log('Receoved credentials:', username, password);
        const user = await Person.findOne({ username: UserName });
        if (!user)
            return done(null, false, { message: 'Incorrect username!' })

        const isPasswordMatch = await user.comparePassword(password);

        if (isPasswordMatch) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'Incorrect password!' })
        }
    } catch (error) {
        return done(error)
    }
}))


module.exports = passport;