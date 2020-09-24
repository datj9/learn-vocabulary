const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
    meanings: {
        type: [String],
        required: true,
    },
    text: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
});

WordSchema.methods = {
    transform: function () {
        const obj = this.toObject();

        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;

        return obj;
    },
};

const Word = new mongoose.model("Word", WordSchema);

module.exports = {
    WordSchema,
    Word,
};
