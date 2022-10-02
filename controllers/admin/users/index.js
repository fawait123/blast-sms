const Validator = require("validatorjs");
const common = require("../../../helpers/common");
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

      let user = await Model[schema].findAndCountAll({
        offset: statement.page,
        limit: statement.limit,
        order: sort,
        distinct: true,
        where: {
          ...search,
        },
      });
      let result = {
        page: statement.pageDisplay,
        limit: statement.limit,
        ...user,
      };
      return res.sendDataList(200, "pesan", result);
    } catch (err) {
      return res.sendData(500, err.message);
    }
  }
  async post(req, res) {
    try {
      let { body } = req;
      let fieldData = {
        ...body,
        createdAt: new Date(),
      };
      let validationRole = {
        username: "required",
        name: "required",
        email: "required",
        password: "required",
      };
      let validator = new Validator(body, validationRole);
      let isValid = validator.passes();
      if (!isValid) {
        return res.sendInvalidData(validator.errors.all());
      }
      let password = await common.passwordHash(fieldData.password);
      fieldData.password = password;
      await Model[schema]
        .create(fieldData)
        .then((result) => {
          return res.sendData(200, "Sukses menambah data", result);
        })
        .catch((err) => {
          return res.sendData(400, "Gagal Menambah Data", err);
        });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  }
  async put(req, res) {
    try {
      let { body, query } = req;
      let fieldData = {
        ...body,
        createdAt: new Date(),
      };
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
      let validationQuery = {
        id: "required",
      };
      let validatorQuery = new Validator(query, validationQuery);
      let isValidQuery = validatorQuery.passes();
      if (!isValidQuery) {
        return res.sendInvalidData(validatorQuery.errors.all());
      }
      if (fieldData.password) {
        let password = await common.passwordHash(fieldData.password);
        fieldData.password = password;
      } else {
        delete fieldData.password;
      }

      let checkID = await Model[schema].findOne({
        where: {
          id: query.id,
        },
      });
      if (!checkID) {
        return res.sendData(400, `Data Tidak ditemukan`);
      }

      await Model[schema]
        .update(fieldData, { where: { id: query.id } })
        .then((result) => {
          return res.sendData(200, "Sukses Mengubah data", result);
        })
        .catch((err) => {
          return res.sendData(400, "Gagal Mengubah Data", err);
        });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  }
  async delete(req, res) {
    try {
      let { query } = req;

      let validationQuery = {
        id: "required",
      };
      let validatorQuery = new Validator(query, validationQuery);
      let isValidQuery = validatorQuery.passes();
      if (!isValidQuery) {
        return res.sendInvalidData(validatorQuery.errors.all());
      }

      let checkID = await Model[schema].findOne({
        where: {
          id: query.id,
        },
      });
      if (!checkID) {
        return res.sendData(400, `Data Tidak ditemukan`);
      }

      await Model[schema]
        .update({ deletedAt: new Date() }, { where: { id: query.id } })
        .then((result) => {
          return res.sendData(200, "Sukses Menghapus data", result);
        })
        .catch((err) => {
          return res.sendData(400, "Gagal Menghapus Data", err);
        });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  }
  async permanent(req, res) {
    try {
      let { query } = req;

      let validationQuery = {
        id: "required",
      };
      let validatorQuery = new Validator(query, validationQuery);
      let isValidQuery = validatorQuery.passes();
      if (!isValidQuery) {
        return res.sendInvalidData(validatorQuery.errors.all());
      }

      let checkID = await Model[schema].findOne({
        where: {
          id: query.id,
        },
      });
      if (!checkID) {
        return res.sendData(400, `Data Tidak ditemukan`);
      }

      await Model[schema]
        .destroy({ where: { id: query.id } })
        .then((result) => {
          return res.sendData(200, "Sukses Menghapus data", result);
        })
        .catch((err) => {
          return res.sendData(400, "Gagal Menghapus Data", err);
        });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  }
}

module.exports = new Users();
