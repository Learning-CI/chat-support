/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.transaction(function(trx) {
    return knex.schema.raw(`
      CREATE TABLE bot (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
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
      DROP TABLE bot;
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  })
};
