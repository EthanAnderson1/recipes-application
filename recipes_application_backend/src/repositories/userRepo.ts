import User from '../models/User.ts';
import { pool } from '../dbconfig.ts';
import { ResultSetHeader} from 'mysql2';


export const create = async (username: string, password: string): Promise<User> =>{
    const query = `INSERT INTO user (username, password) VALUES (?, ?)`;
    const [result] = await pool.query<ResultSetHeader>(query,[username,password]);
    return { id: result.insertId, username, password } as User;
}

export const findByUsername = async (username: string): Promise<User | null> =>{
    const query = `SELECT * FROM user WHERE username = ?`;
    // eslint-disable-next-line
    const [rows] = await pool.query<any[]>(query,[username]);
    if (rows.length === 0) return null;
    // eslint-disable-next-line
    const row= rows[0] as any;
    return { id: row.id, username: row.username, password: row.password } as User;
}