const db = require('./db');


export async function test() {
  const q = 'SELECT * FROM users LIMIT 100'
  const result = await db.query(q);
  console.log(result);
}