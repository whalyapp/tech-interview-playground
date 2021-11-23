import { Pool, Client, QueryResult } from 'pg';

export const runSQLQuery = async <T = any>(queryText: string): Promise<QueryResult<T>> => {
    // pools will use environment variables
    // for connection information
    const pool = new Pool()
    // you can also use async/await
    const res = await pool.query(queryText)
    await pool.end();
    return res;
}