const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
    test: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "Test",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    records: {
        type: [Number],
        required: true,
    },
});

ResultSchema.methods = {
    transform: function () {
        const obj = this.toObject();

        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;

        return obj;
    },
};

const Result = new mongoose.model("Result", ResultSchema);

module.exports = {
    ResultSchema,
    Result,
};
