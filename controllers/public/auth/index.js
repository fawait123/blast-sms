const { Op } = require("sequelize");
const Validator = require("validatorjs");
const common = require("../../../helpers/common");
const Model = require("../../../models/index");
const moment = require("moment");

const schema = "users";

class Auth {
  async login(req, res) {
    try {
      let { body } = req;
      let validationRole = {
        username: "required",
        password: "required",
      };
      let validator = new Validator(body, validationRole);
      let isValid = validator.passes();
      if (!isValid) {
        return res.sendInvalidData(validator.errors.all());
      }

      let user = await Model[schema].findOne({
        where: {
          [Op.or]: [
            {
              username: body.username,
            },
            {
              email: body.username,
            },
          ],
        },
      });

      if (!user) {
        return res.sendData(400, "Email/Username anda tidak terdaftar");
      }

      let checkPassword = await common.passwordCompare(
        user.password,
        body.password
      );

      if (!checkPassword) {
        return res.sendData(400, "Password anda tidak sesuai");
      }

      let token = await common.jwtSign({ user });
      user.dataValues.token = token;

      let expired = moment().add(5, "days").format("YYYY-MM-DD");

      await Model.session_users
        .create({
          userID: user.id,
          token,
          expired,
        })
        .then(() => {
          return res.sendData(200, user);
        });
    } catch (err) {
      return res.sendData(500, err.message);
    }
  }
}

module.exports = new Auth();
