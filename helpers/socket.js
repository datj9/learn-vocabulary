const { SavedWord } = require("../models/SavedWord");
const { Result } = require("../models/Result");
const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const runSocket = (server) => {
    const io = socketIO(server);

    io.on("connection", function (socket) {
        socket.on("saveWord", async function (data) {
            const { word, accessToken } = data;

            try {
                const user = jwt.verify(accessToken, secretKey);
                const newSavedWord = new SavedWord({
                    user: user.id,
                    word,
                });
                await newSavedWord.save();

                socket.emit("resNewSavedWord", { newSavedWord: newSavedWord.transform() });
            } catch (error) {
                socket.emit("resNewSavedWord", error);
            }
        });
        socket.on("getSavedWords", async function ({ accessToken }) {
            try {
                const user = jwt.verify(accessToken, secretKey);
                const savedWords = await SavedWord.find({ user: user.id });

                savedWords.forEach((word, i) => (savedWords[i] = word.transform()));
                socket.emit("resSavedWords", { savedWords });
            } catch (error) {
                socket.emit("resSavedWords", error);
            }
        });
        socket.on("saveResult", async function ({ indexOfQuestion, answer, test, accessToken }) {
            try {
                const user = jwt.verify(accessToken, secretKey);
                const result = await Result.findOne({ user: user.id, test });

                result.records[indexOfQuestion] = answer;
                await Result.updateOne({ user: user.id, test }, { records: result.records });
                socket.emit("resSaveResult", { isSuccess: true });
            } catch (error) {
                socket.emit("resSaveResult", { isSuccess: false, ...error });
            }
        });
    });
};

module.exports = runSocket;
