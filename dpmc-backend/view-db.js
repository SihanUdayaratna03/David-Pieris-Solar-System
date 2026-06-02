const db = require('./db');

try {
  const rows = db.prepare('SELECT * FROM deposit_codes').all();
  if (rows.length === 0) {
    console.log('\n📭 The database is currently empty.');
  } else {
    console.log(`\n📊 Found ${rows.length} record(s) in the database:\n`);
    console.table(rows);
  }
} catch (err) {
  console.error('❌ Error reading database:', err.message);
}
db.close();
