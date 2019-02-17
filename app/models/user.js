// load the things we need
var itemSchema = require('./item');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var itemSchema = mongoose.Schema({
    origname: String,
    name: String,
    link: String,
}, { usePushEach: true });

// define the schema for our user model
var userSchema = mongoose.Schema({
    name         : String,
    email        : String,
    password     : String,
    items        : [itemSchema],
},{ usePushEach: true });

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
