'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User,{
        as:'USERS',
        foreignKey:'userId',
        targetKey: 'id'
      })
    }
  };
  Todo.init({
    nom: DataTypes.STRING,
    dateTodo: DataTypes.STRING,
    complited: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    datastatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};