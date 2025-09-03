import User from '../models/User.ts';
import { pool } from '../dbconfig.ts';
import { ResultSetHeader } from 'mysql2';


export const create = async (username: string, password: string): Promise<User> =>{
    const query = `INSERT INTO user (username, password) VALUES (?, ?)`;
    const [result] = await pool.query<ResultSetHeader>(query,[username,password]);
    return { id: result.insertId, username, password };
}