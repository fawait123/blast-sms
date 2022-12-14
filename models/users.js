"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      deletedAt: DataTypes.DATEONLY,
    },
    {
      defaultScope: {
        where: {
          deletedAt: {
            [Op.is]: null,
          },
        },
      },
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
