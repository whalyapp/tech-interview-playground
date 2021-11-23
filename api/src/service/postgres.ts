import { Pool, Client, QueryResult } from 'pg';

// pools will use environment variables
// for connection information
const pool = new Pool()

export const runSQLQuery = async <T = any>(queryText: string): Promise<QueryResult<T>> => {
    // you can also use async/await
    const res = await pool.query(queryText)
    await pool.end();
    return res;
}