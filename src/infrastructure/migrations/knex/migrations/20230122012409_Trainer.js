/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.transaction(function(trx) {
    return knex.schema.raw(`
      CREATE TABLE trainer (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
          
        FOREIGN KEY (user_id) REFERENCES user(id)
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
      DROP TABLE trainer;
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  })
};
