const { SavedWord } = require("../models/SavedWord");
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
                    user,
                    word,
                });
                await newSavedWord.save();

                socket.emit("resNewSavedWord", { newSavedWord: newSavedWord.transform() });
            } catch (error) {}
        });
        socket.on("getSavedWords", async function ({ accessToken }) {
            try {
                const user = jwt.verify(accessToken, secretKey);
                const savedWords = await SavedWord.find({ user: user.id });

                savedWords.forEach((word, i) => (savedWords[i] = word.transform()));
                socket.emit("resSavedWords", { savedWords });
            } catch (error) {}
        });
    });
};

module.exports = runSocket;
