/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.transaction(function(trx) {
    return knex.schema.raw(`
      CREATE TABLE training_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question VARCHAR(1000) NOT NULL,
        answer VARCHAR(1000) NOT NULL,
        bot_feedback VARCHAR(1000) NOT NULL,
        bot_feedback_at TIMESTAMP,
        bot_id INT NOT NULL,
        trainer_id INT NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
          
        FOREIGN KEY (bot_id) REFERENCES bot(id),
        FOREIGN KEY (trainer_id) REFERENCES trainer(id)
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
      DROP TABLE training_history;
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  })
};
