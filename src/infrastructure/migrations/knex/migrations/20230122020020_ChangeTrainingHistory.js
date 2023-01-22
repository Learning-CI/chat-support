/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.transaction(function(trx) {
    return knex.schema.raw(`
      ALTER TABLE training_history
      MODIFY bot_feedback VARCHAR(1000) DEFAULT NULL
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
      ALTER TABLE training_history
      MODIFY bot_feedback VARCHAR(1000) NOT NULL
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  })
};
