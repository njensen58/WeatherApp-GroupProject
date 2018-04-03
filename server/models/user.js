const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },  
    name: {
        type: String
    },
    location: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

///////////////////////////////////////////////
// encrypts password with bcrypt upon signup //
userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});


/////////////////////////////////////////////////////////////////////////////////////////
// Schema Method used in login route to check if encrypted password matches user input //
userSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch)
    })
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Delete the password after verifying if it was correct or not so that it's only being saved in the database //
userSchema.methods.withoutPassword = function(){
    const user = this.toObject();
    delete user.password;
    return user;
}


module.exports = mongoose.model('User', userSchema);
