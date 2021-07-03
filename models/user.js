var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    nic: {
        type: String
    },
    mobile: {
        type: Number
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    dob: {
        type: String
    },
    stream: {
        type: String
    },
    subject: {
        type: String
    },
    gender: {
        type: String
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String
    }
})

UserSchema.pre('save', function (next) {
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
};

module.exports = mongoose.model('User', UserSchema);