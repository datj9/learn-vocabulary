const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
    ],
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
});

TestSchema.methods = {
    transform: function () {
        const obj = this.toObject();

        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;

        return obj;
    },
};

const Test = new mongoose.model("Test", TestSchema);

module.exports = {
    TestSchema,
    Test,
};
