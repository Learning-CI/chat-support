/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.transaction(function(trx) {
    return knex.schema.raw(`
      CREATE TABLE user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
      );
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.transaction(function(trx) {
    return knex.schema.raw(`
      DROP TABLE user;
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  })
};
