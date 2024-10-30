'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KeyWord extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  KeyWord.init(
    {
      name: DataTypes.STRING,
      isGood: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'KeyWord',
    },
  );
  return KeyWord;
};
