'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class session_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  session_users.init({
    userID: DataTypes.INTEGER,
    token: DataTypes.TEXT,
    expired: DataTypes.DATEONLY,
    deletedAt: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'session_users',
  });
  return session_users;
};