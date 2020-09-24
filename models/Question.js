const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word",
    },
    text: String,
    answers: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: Number,
        required: true,
    },
    description: String,
    createdAt: {
        type: Number,
        default: Date.now(),
        required: true,
    },
});

QuestionSchema.methods = {
    transform: function () {
        const obj = this.toObject();

        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;

        return obj;
    },
};

const Question = new mongoose.model("Question", QuestionSchema);

module.exports = {
    QuestionSchema,
    Question,
};
