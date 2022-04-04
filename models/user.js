const mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema(
    {
        uid: {type: ObjectId, index: true, required: true, auto: true, unique: true},
        email: {type: String, required: true, unique: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
        avatarSrc: {type: String, required: true},
        role: {type: String, default: "user-free"},
    },
    {
        timestamps: true
    }
);

// ensure email is unique
UserSchema.plugin(UniqueValidator)
module.exports = mongoose.model("User", UserSchema)