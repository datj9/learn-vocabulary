const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const hashPassBcrypt = promisify(bcrypt.hash);

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: "client",
    },
    profileImageURL: String,
});

UserSchema.methods = {
    transform: function () {
        const obj = this.toObject();

        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        delete obj.password;

        return obj;
    },
    hashPassword: async function (inputPassword) {
        const hash = await hashPassBcrypt(inputPassword, 8);

        return hash;
    },
    comparePassword: async function (inputPassword) {
        const isMatch = await bcrypt.compare(inputPassword, this.password);

        return isMatch;
    },
};

const User = new mongoose.model("User", UserSchema);

module.exports = {
    UserSchema,
    User,
};
