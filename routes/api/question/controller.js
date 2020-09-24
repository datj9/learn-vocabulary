const { Question } = require("../../../models/Question");
const ObjectId = require("mongoose").Types.ObjectId;

const createQuestion = async (req, res) => {
    const { text, word, answers, correctAnswer, description } = req.body;

    try {
        const newQuestion = new Question({
            text,
            word,
            answers,
            correctAnswer,
            description,
        });

        await newQuestion.save();

        return res.status(201).json(newQuestion.transform());
    } catch (error) {
        return res.status(500).json(error);
    }
};

const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const { text, word, answers, correctAnswer, description } = req.body;

    if (!ObjectId.isValid(questionId)) return res.status(400).json({ questionId: "questionId is invalid" });
    try {
        const question = await Question.findById(question);
        if (!question) return res.status(404).json({ error: "Question not found" });

        await Question.updateOne({ _id: questionId }, { text, word, answers, correctAnswer, description });
        return res.status(201).json({ isSuccess: tru });
    } catch (error) {
        return res.status(500).json(error);
    }
};
module.exports = { createQuestion, updateQuestion };
