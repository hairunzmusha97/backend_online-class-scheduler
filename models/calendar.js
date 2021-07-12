var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var CalendarSchema = new mongoose.Schema({
    
    startTime:{
        type:String
    },
    title:{
        type:String
    },
    discription:{
        type:String
    },
});

/*UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};*/

module.exports = mongoose.model('Calendar', CalendarSchema);