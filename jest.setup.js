const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./models/user');
const DietLogModel = require('./models/dietLog');
const FoodPurgeLogModel = require('./models/foodPurgeLog');
const DietLogReflectionModel = require('./models/dietLogReflection');
const MealPlanModel = require('./models/mealPlan');

const sequelize = new Sequelize('database_test', 'root', 'password', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
});

const User = UserModel(sequelize, DataTypes);
const DietLog = DietLogModel(sequelize, DataTypes);
const MealPlan = MealPlanModel(sequelize, DataTypes);
const FoodPurgeLog = FoodPurgeLogModel(sequelize, DataTypes);
const DietLogReflection = DietLogReflectionModel(sequelize, DataTypes);

// Define associations
User.hasMany(DietLog, { foreignKey: 'user_id' });
DietLog.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(FoodPurgeLog, { foreignKey: 'user_id' });
FoodPurgeLog.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(DietLogReflection, { foreignKey: 'user_id' });
DietLogReflection.belongsTo(User, { foreignKey: 'user_id' });

DietLog.belongsToMany(DietLogReflection, {
  through: 'DietLogReflectionLink',
  foreignKey: 'diet_log_id',
  otherKey: 'reflection_id'
});

DietLogReflection.belongsToMany(DietLog, {
  through: 'DietLogReflectionLink',
  foreignKey: 'reflection_id',
  otherKey: 'diet_log_id'
});

FoodPurgeLog.belongsToMany(DietLogReflection, {
  through: 'FoodPurgeReflectionLink',
  foreignKey: 'food_purge_log_id',
  otherKey: 'reflection_id'
});

DietLogReflection.belongsToMany(FoodPurgeLog, {
  through: 'FoodPurgeReflectionLink',
  foreignKey: 'reflection_id',
  otherKey: 'food_purge_log_id'
});

module.exports = {
  sequelize,
  User,
  DietLog,
  MealPlan,
  FoodPurgeLog,
  DietLogReflection,
};
