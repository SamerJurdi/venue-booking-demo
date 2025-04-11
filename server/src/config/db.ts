import pg from 'pg';

const { Pool } = pg;

// Initialize connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Example method for running a query
export async function queryDatabase(queryText: string): Promise<any> {
  try {
    const result = await pool.query(queryText);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}
