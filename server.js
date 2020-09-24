const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { mongoURI } = require("./config/index");
const { runSocket } = require("./helpers/socket");
const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

app.use(cors());

runSocket(server);

app.use(express.json({ extended: true }));
app.use("/api", require("./routes/api"));

mongoose.connect(
    mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    () => console.log("Connected to MongoDB successfully")
);

server.listen(port, () => console.log(`Server is running on port ${port}`));
