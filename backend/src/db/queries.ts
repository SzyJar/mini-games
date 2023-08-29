const db = require('./db');


export async function selectUser(name: string): Promise<{ id: number, name: string, password: string } | null> {
  const query = `SELECT * FROM users WHERE name = $1`
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

export async function scoreAchievement(user_id: number, achiev_id: number): Promise<number> {
  const query = `
  INSERT INTO scored_achiev (user_id, achievement_id)
  VALUES ($1, $2)
  RETURNING id
  `
  const values = [user_id, achiev_id];
  const result = await db.query(query, values);

  return result.rows[0].id;
}

export async function getAchievName(id: number): Promise<string> {
  const query = `SELECT name FROM achievements
  WHERE id = $1
  `
  const values = [id,];
  const result = await db.query(query, values);
  return result.rows[0].name;
}

interface Achievement {
  scored_at: string;
  name: string;
  description: string;
}

export async function getAchievements(id: number): Promise<Achievement[]> {
  const query = `SELECT scored_at, name, description FROM scored_achiev
  INNER JOIN achievements
  ON scored_achiev.achievement_id = achievements.id
  WHERE user_id = $1
  `
  const values = [id,];
  const result = await db.query(query, values);
  return result.rows;
}