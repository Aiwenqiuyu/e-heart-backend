const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FoodPurgeLog = sequelize.define('FoodPurgeLog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    emotion_intensity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    emotion_type: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    trigger: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    additional_info: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
  }, {
    tableName: 'food_purge_logs',
    timestamps: true,
  });
  return FoodPurgeLog;
};