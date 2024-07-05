const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//const port = 3306;
const mysql = require('mysql2/promise'); // 确保导入 mysql2/promise
const db = require('./models'); // 导入 Sequelize 实例


// Import routes
const userRoutes = require('./routes/userRoutes');
const dietLogRoutes = require('./routes/dietLogRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const foodPurgeLogRoutes = require('./routes/foodPurgeLogRoutes');
const dietLogReflectionRoutes = require('./routes/dietLogReflectionRoutes');

// Middleware
app.use(express.json());

// Setup routes
app.use('/api/users', userRoutes);
app.use('/api/diet_logs', dietLogRoutes);
app.use('/api/food_purge_logs', foodPurgeLogRoutes);
app.use('/api/meal_plans', mealPlanRoutes);
// app.use('/api/impulse_records', impulseRecordRoutes);
// app.use('/api/impulse_strategies', impulseStrategyRoutes);
app.use('/api/diet_log_reflections', dietLogReflectionRoutes);
//app.use('/api/meal_plan_reflections', mealPlanReflectionRoutes);
// app.use('/api/impulse_record_reflections', impulseRecordReflectionRoutes);

// 配置数据库连接
const sequelizeConfig = require('./config/database.js').test;
// const connection = mysql.createConnection({
//   host: 'localhost', // 数据库服务器地址
//   user: 'root', // 数据库用户名
//   password: 'Wsr413..', // 数据库用户密码
//   database: 'testdatabase' // 要连接的数据库名称
// });

// // 连接到数据库
// connection.connect((err) => {
//   if (err) {
//     console.error('连接失败: ' + err.stack);
//     return;
//   }

//   console.log('连接成功，连接ID ' + connection.threadId);
// });
// 定义 createDatabase 函数
async function createDatabase() {
  console.log(`Connecting to MySQL with user: ${sequelizeConfig.username} and password: ${sequelizeConfig.password}`);

  // Use mysql2 to connect to MySQL server
  const connection = await mysql.createConnection({
    host: sequelizeConfig.host,
    user: sequelizeConfig.username,
    password: sequelizeConfig.password, // Ensure correct password
  });

  // Create database if it doesn't exist
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${sequelizeConfig.database}\`;`);
  console.log('连接成功，连接ID ' + connection.threadId);
  await connection.end();
}

// Create database and start server
createDatabase().then(() => {
  // Sync models

  // 同步模型
  db.sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }).catch(error => {
    console.error('Unable to connect to the database:', error);
  });
}).catch(error => {
  console.error('Error creating database:', error);
});
module.exports = app; // 确保导出 app 对象