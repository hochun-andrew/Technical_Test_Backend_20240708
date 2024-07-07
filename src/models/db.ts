import pg from 'pg';

const { Pool } = pg;
 
const pool = new Pool();
 
export const query = (text: string, params: any[]) => {
  return pool.query(text, params);
};
