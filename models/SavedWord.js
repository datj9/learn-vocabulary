const mongoose = require("mongoose");

const SaveWordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word",
    },
    createdAt: {
        type: Number,
        default: Date.now(),
        required: true,
    },
});

SaveWordSchema.methods = {
    transform: function () {
        const obj = this.toObject();

        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;

        return obj;
    },
};

const SaveWord = new mongoose.model("SaveWord", SaveWordSchema);

module.exports = {
    SaveWordSchema,
    SaveWord,
};
