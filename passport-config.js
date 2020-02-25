const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

const initialize = (passport, getUserByEmail) => {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if(user == null) {
            return done(null, false, { message: 'No user with that email'});
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect'})
            }
        } catch (error) {
            return done(error);
        }
    }

passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
}

module.exports = initialize