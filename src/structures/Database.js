const { CreateSql } = require('database-sempai');

class Database extends CreateSql {
  constructor(options) {
    super({
      path: this.path || "database",
      table: this.table || ["main"],
      key: this.key || "bot"
    });
  }
}

module.exports = Database;