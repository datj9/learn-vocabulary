const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const { promisify } = require("util");
const { User } = require("../../../models/User");
const { secretKey } = require("../../../config");
const hashPass = promisify(bcrypt.hash);

const signUp = async (req, res) => {
    const { email, password, name } = req.body;
    const errors = {};

    if (!isEmail(email + "")) errors.email = "email is invalid";
    if ((password + "").length < 8) errors.password = "password is too short";
    if ((name + "").length < 3) errors.name = "name is too short";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    try {
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ email: "email already exists" });

        const hash = await hashPass(password + "", 10);
        const newUser = new User({
            email,
            name: name + "",
            password: hash,
        });
        await newUser.save();
        const accessToken = jwt.sign(newUser.transform(), secretKey, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: "365d" });

        return res.status(201).json({ refreshToken, accessToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const errors = {};

    if (!isEmail(email + "")) errors.email = "email is invalid";
    if ((password + "").length < 8) errors.password = "password is too short";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ email: "email does not exist" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ password: "password is not correct" });

        const accessToken = jwt.sign(user.transform(), secretKey, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: user._id }, secretKey, { expiresIn: "365d" });

        return res.status(200).json({ refreshToken, accessToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const generateNewAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ error: "refresh_token is required" });

    try {
        const { id } = jwt.verify(refreshToken, secretKey);
        const user = await User.findById(id);

        const accessToken = jwt.sign(user.transform(), secretKey, { expiresIn: "1h" });

        return res.status(200).json({ accessToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

module.exports = { signUp, signIn, generateNewAccessToken };
