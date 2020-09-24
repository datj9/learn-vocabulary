const isURL = require("validator/lib/isURL");
const { Word } = require("../../../models/Word");

const getWordsByText = async (req, res) => {
    const { text } = req.query;

    if (!text || typeof text != "string") return res.status(400).json({ text: "text is invalid" });

    const regExp = RegExp(text, "gi");
    const words = await Word.find({ text: regExp });

    words.forEach((word, i) => (words[i] = word.transform()));

    return res.status(200).json(words);
};

const createWord = async (req, res) => {
    const { text, image, meanings } = req.body;
    const errors = {};

    if (text + "".length < 2) errors.text = "text is invalid";
    if (image && !isURL(image + "")) errors.image = "image is invalid";
    if (!Array.isArray(meanings) || meanings.length == 0) errors.meanings = "meanings is invalid";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    try {
        const word = await Word.findOne({ text });
        if (word) return res.status(400).json({ text: "word already exists" });

        const newWord = new Word({
            text,
            image,
            meanings,
        });
        await newWord.save();

        return res.status(201).json(newWord.transform());
    } catch (error) {
        return res.status(500).json(error);
    }
};

const updateWord = async (req, res) => {
    const { text, image, meanings } = req.body;
    const errors = {};

    if (text + "".length < 2) errors.text = "text is invalid";
    if (image && !isURL(image + "")) errors.image = "image is invalid";
    if (!Array.isArray(meanings) || meanings.length == 0) errors.meanings = "meanings is invalid";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    try {
        const word = await Word.findOne({ text });
        if (!word) return res.status(404).json({ text: "word not found" });

        await Word.updateOne({ word }, { text, image, meanings });

        return res.status(200).json({ isSuccess: true });
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { getWordsByText, createWord, updateWord };
