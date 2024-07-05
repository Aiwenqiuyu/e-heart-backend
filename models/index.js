const Sequelize = require('sequelize');
const sequelize = require('../utils/db');

const UserModel = require('./user');
const DietLogModel = require('./dietLog');
const FoodPurgeLogModel = require('./foodPurgeLog');
const DietLogReflectionModel = require('./dietLogReflection');
const MealPlan = require('./mealPlan');
const User = UserModel(sequelize, Sequelize);
const DietLog = DietLogModel(sequelize, Sequelize);
const FoodPurgeLog = FoodPurgeLogModel(sequelize, Sequelize);
const DietLogReflection = DietLogReflectionModel(sequelize, Sequelize);

// 定义模型之间的关系
User.hasMany(DietLog, { foreignKey: 'user_id' });
DietLog.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(FoodPurgeLog, { foreignKey: 'user_id' });
FoodPurgeLog.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(DietLogReflection, { foreignKey: 'user_id' });
DietLogReflection.belongsTo(User, { foreignKey: 'user_id' });

// 定义多对多关系，通过自动生成的中间表
DietLog.belongsToMany(DietLogReflection, { through: 'DietLogReflectionLink', foreignKey: 'diet_log_id', otherKey: 'reflection_id' });
DietLogReflection.belongsToMany(DietLog, { through: 'DietLogReflectionLink', foreignKey: 'reflection_id', otherKey: 'diet_log_id' });

FoodPurgeLog.belongsToMany(DietLogReflection, { through: 'FoodPurgeReflectionLink', foreignKey: 'food_purge_log_id', otherKey: 'reflection_id' });
DietLogReflection.belongsToMany(FoodPurgeLog, { through: 'FoodPurgeReflectionLink', foreignKey: 'reflection_id', otherKey: 'food_purge_log_id' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  DietLog,
  MealPlan,
  FoodPurgeLog,
  DietLogReflection,
};
