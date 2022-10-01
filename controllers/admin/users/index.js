const Validator = require("validatorjs");
const Statement = require("../../../helpers/statement");
const Model = require("../../../models");

const schema = "users";

class Users {
  async get(req, res) {
    try {
      let { query } = req;
      let statement = new Statement(query, ["username", "email", "name"]);
      let search = statement.search();
      let sort = statement.eagerSorting();

      let user = await Model[schema].findAll({
        order: sort,
        where: {
          ...search,
        },
      });
      return res.sendDataList(200, "pesan", user);
    } catch (err) {
      return res.sendData(500, err.message);
    }
  }
  async post(req, res) {
    try {
      let validationRole = {
        username: "required",
        name: "required",
        email: "required",
      };
      let validator = new Validator(body, validationRole);
      let isValid = validator.passes();
      if (!isValid) {
        return res.sendInvalidData(validator.errors.all());
      }
      return res.sendData(200, body);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  }
}

module.exports = new Users();
