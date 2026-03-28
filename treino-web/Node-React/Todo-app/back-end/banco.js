const Database = require('better-sqlite3')
const db = new Database('tarefas.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    concluida INTEGER DEFAULT 0
  )
`)

module.exports = db