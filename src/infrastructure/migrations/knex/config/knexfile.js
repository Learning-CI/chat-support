module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'user',
      password: 'password',
      database: 'chat-support'
    },
    migrations: {
      directory: '../migrations'
    }
  }
};
