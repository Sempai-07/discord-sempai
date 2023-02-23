const { CreateSql } = require('database-sempai');

class Database extends CreateSql {
  constructor(options = {}) {
    super({
      path: options.path || "database",
      table: options.table || ["main"],
      key: options.key || "bot"
    });
  }
}

module.exports = Database;

// © 2022 @Sempai Development