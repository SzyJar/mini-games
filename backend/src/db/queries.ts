const db = require('./db');


export async function selectUser(name: string): Promise<{ name: string; password: string } | null> {
  const query = `SELECT name, password FROM users WHERE name = $1`
  const values = [name];
  const result = await db.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}
export async function createUser(name: string, password: string): Promise<number> {
  const query = `
  INSERT INTO users (name, password)
  VALUES ($1, $2)
  RETURNING id
  `
  const values = [name, password];
  const result = await db.query(query, values);

  return result.rows[0].id;
}