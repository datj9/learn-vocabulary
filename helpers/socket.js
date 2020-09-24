const { SaveWord } = require("../models/SavedWord");
const socketIO = require("socket.io");

const runSocket = (server) => {
    const io = socketIO(server);

    io.on("connection", function (socket) {
        socket.on("auth", function (data) {
            socket.emit("authSuccess", data);
        });

        socket.on("saveWord", async function (data) {
            const { user, word } = data;
            const newSavedWord = new SaveWord({
                user,
                word,
            });
            await newSavedWord.save();
        });
    });
};

module.exports = runSocket;
