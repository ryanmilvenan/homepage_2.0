var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

mongoose.connect('mongodb://localhost/news')
var db = mongoose.connection;

var newsSourceSchema = mongoose.Schema({
    title: String,
    url: String,
    sourceID: String
});

var NewsSource = mongoose.model('source', newsSourceSchema);

var sessionSchema = mongoose.Schema({
    session: String
});

var Session = mongoose.model('sessions', sessionSchema);

var userSchema = mongoose.Schema({
    username: { type: String, required: true, index: {unique: true} },
    password: { type: String, required: true }
});

userSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);  
    });
};

var User = mongoose.model('users', userSchema);

module.exports = {
    mongoose: mongoose,
    NewsSource: NewsSource,
    Session: Session,
    User: User
};
