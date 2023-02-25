require('dotenv').config()
const { User } = require('../db/Models/usersModel')
const { Auth } = require('../db/Models/authModel')
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

const login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'Email not found ' });
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err || !result) {
                    return res.status(401).json({ message: 'Incoorect Password' });
                }
                const AccessToken = jwt.sign(
                    { id: user.id, email: user.email, role: user.role, name: user.name },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30m' }
                );
                const RefreshToken = jwt.sign(
                    { id: user.id, email: user.email, role: user.role, name: user.name },
                    process.env.REFRESH_TOKEN_SECRET,
                );
                const User_token = {
                    RefreshToken: RefreshToken
                }
                User.findOneAndUpdate({ email: email }, User_token, { new: true })
                    .then(res.status(200).json({ AccessToken: AccessToken, RefreshToken: RefreshToken }))
                    .catch(err => res.status(400).json({ error: 'Unable to update user' }));
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
}

const CreateAccesToken = (req, res) => {
    RefreshToken = req.body.RefreshToken
    User.findOne({ RefreshToken: RefreshToken }).then(
        (user => {
            if (user) {
                const AccessToken = jwt.sign(
                    { id: user.id, email: user.email, role: user.role, name: user.name },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                );
                const RefreshToken = jwt.sign(
                    { id: user.id, email: user.email, role: user.role, name: user.name },
                    process.env.REFRESH_TOKEN_SECRET
                );
                user.RefreshToken = RefreshToken;
                user.save().then(res.status(200).json({ AccessToken: AccessToken, RefreshToken: RefreshToken }))
                    .catch(err => res.status(400).json({ error: 'Unable to update user' }));
            }
            else {
                res.status(400).json("there is no User");
            }


        })
    )
}

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // validate email address
        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        // generate verification key
        const key = Math.floor(100000 + Math.random() * 900000);

        // store verification key and email address in database
        const hashedKey = bcrypt.hashSync(String(key), 10);

        const auth = await new Auth({
            email: email,
            key: hashedKey,
        }).save();

        // create transporter for sending email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: { rejectUnauthorized: false },
        });

        // create email message
        const message = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Reset Password',
            text: `this is your key :${key}`,
        };

        // send email
        await transporter.sendMail(message);

        res.status(200).send({ message: 'Password reset email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

//reset password !

const resetPassword = async (req, res) => {
    const { email, key, password } = req.body;
    if (!key || !password || !email) {
        res.status(400).json({ message: "Password,Key,email are required" })
    }
    else {
        // lookup hashed key for email address in database
        const auth = await Auth.findOne({ email });
        if (!auth && !bcrypt.compareSync(String(key), auth.key)) {
            return res.status(400).send({ message: 'Invalid key' });
        }
        else {
            await Auth.deleteOne({ email });
            const user = await User.findOne({ email })
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword;
            await user.save()
                .then(
                    res.status(200).json({ message: "password updated!" })
                )
                .catch(err => res.status(400).json({ error: err }));

        }
    }
};
module.exports = {
    login, CreateAccesToken, forgetPassword, resetPassword
}