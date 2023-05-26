const Users = require('../users/model');
const Token = require('../users/token');
const path = require('path');
const fs = require('fs');
const config = require('../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const url = require('url');
const sendMail = require('../utils/sendEmail');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const payload = req.body;
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`,
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const users = new Users({
              ...payload,
              avatar: filename,
            });

            await users.save();

            delete users._doc_password;

            res.status(201).json({ data: users });
          } catch (err) {
            if (err && err.name === 'ValidationError') {
              return res.status(422).json({
                error: 1,
                message: err.message,
                fields: err.errors,
              });
            }
            next(err);
          }
        });
      } else {
        let users = new Users(payload);

        await users.save();

        delete users._doc_password;

        res.status(201).json({ data: users });
      }
    } catch (err) {
      if (err && err.name === 'ValidationError') {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
      next(err);
    }
  },
  requestPasswordReset: async (req, res, next) => {
    const { email } = req.body;
    const clientURL = process.env.CLIENT_URL;

    Users.findOne({ email: email })
      .then(async (user) => {
        if (user) {
          let token = await Token.findOne({ userId: user._id });
          if (!token) {
            token = await new Token({
              userId: user._id,
              token: crypto.randomBytes(32).toString('hex'),
            }).save();
          }
          const link = `${clientURL}/auth/reset-password/${user._id}/${token.token}`;
          console.log(`${link} 3131`);
          sendEmail(
            user.email,
            'Password Reset Request',
            { name: user.name, link: link },
            './emails/template/requestResetPassword.handlebars',
          );
          res.send('password reset link sent to your email account');
        } else {
          res.status(403).json({
            message: 'email yang anda masukan belum terdaftar',
          });
        }
      })
      .catch((err) => {
        res.status(505).json({
          message: err.message || `Internal server error`,
        });
        next();
      });
  },
  resetPassword: async (req, res, next) => {
    const { password } = req.body;
    const paramsUser = req.params.id;
    const paramsId = req.params.token;

    const passwordResetToken = await Token.findOne({
      userId: paramsUser,
      token: paramsId,
    });
    if (!passwordResetToken) {
      return res.status(400).send('Invalid link or expired');
    }

    const hash = await bcrypt.hash(password, 10);
    await Users.updateOne({ _id: paramsUser }, { $set: { password: hash } });
    console.log(passwordResetToken);
    await passwordResetToken.delete();

    const user = await Users.findById({ _id: paramsUser });
    sendMail(
      user.email,
      'Password Reset Successfully',
      { name: user.name },
      './emails/template/resetPassword.handlebars',
    );

    res.send('password reset sucessfully.');
  },
  signin: async (req, res, next) => {
    const { email, password } = req.body;

    Users.findOne({ email: email })
      .then((user) => {
        if (user) {
          const checkPassword = bcrypt.compareSync(password, user.password);

          if (checkPassword) {
            const token = jwt.sign(
              {
                user: {
                  id: user.id,
                  email: user.email,
                  nama: user.nama,
                  phoneNumber: user.phoneNumber,
                  avatar: user.avatar,
                },
              },
              config.jwtKey,
            );

            res.status(200).json({
              data: { token },
            });
          } else {
            res.status(403).json({
              message: 'password yang anda masukan salah',
            });
          }
        } else {
          res.status(403).json({
            message: 'email yang anda masukan belum terdaftar',
          });
        }
      })
      .catch((err) => {
        res.status(505).json({
          message: err.message || `Internal server error`,
        });
        next();
      });
  },
  getEmail: async (req, res, next) => {
    const { email } = req.body;

    Users.findOne({ email: email })
      .then((response) => {
        if (response) {
          res.status(200).json({
            data: response,
          });
        } else {
          res.status(403).json({
            message: 'email yang anda masukan belum terdaftar',
          });
        }
      })
      .catch((err) => {
        res.status(505).json({
          message: err.message || `Internal server error`,
        });
        next();
      });
    console.log(email);
  },
};
