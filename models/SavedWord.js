const mongoose = require("mongoose");

const SavedWordSchema = new mongoose.Schema({
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

SavedWordSchema.methods = {
    transform: function () {
        const obj = this.toObject();

        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;

        return obj;
    },
};

const SavedWord = new mongoose.model("SavedWord", SavedWordSchema);

module.exports = {
    SavedWordSchema,
    SavedWord,
};
