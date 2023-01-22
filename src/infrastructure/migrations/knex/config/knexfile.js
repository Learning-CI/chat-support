require('dotenv').config({
  path: __dirname + '/../../../env-config/.env',
  debug: false
});


module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    migrations: {
      directory: '../migrations'
    }
  }
};
