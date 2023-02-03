/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.transaction(function(trx) {

    const query1 = knex.schema.raw(`
      INSERT INTO machine_learning (id, name) VALUES (1, 'ChatGPT')
    `).transacting(trx)

    return Promise.all([query1])
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
      DELETE FROM machine_learning WHERE id = 1;
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  })
};
