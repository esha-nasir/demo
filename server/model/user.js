const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    displayName: { type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cpassword: {type: String, required: true},
   
    },
    { collection: 'new'}
)

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;