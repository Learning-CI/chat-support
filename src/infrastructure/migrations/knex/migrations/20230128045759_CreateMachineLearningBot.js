/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.transaction(function(trx) {

    const query1 = knex.schema.raw(`
      CREATE TABLE machine_learning (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
      );
    `).transacting(trx)

    const query2 = knex.schema.raw(`
      CREATE TABLE machine_learning_bot (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bot_id INT NOT NULL,
        machine_learning_id INT NOT NULL,
        training_active BOOLEAN NOT NULL,
        supporting_active BOOLEAN NOT NULL,
        context_id VARCHAR(100) DEFAULT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,

        FOREIGN KEY (bot_id) REFERENCES bot(id),
        FOREIGN KEY (machine_learning_id) REFERENCES machine_learning(id),
        INDEX (bot_id)
      );
    `).transacting(trx)

    return Promise.all([query1, query2])
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
      DROP TABLE machine_learning;
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  })
};
