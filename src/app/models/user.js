'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo,{
        as:'Todo',
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    datastatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};