import app from './app.ts';
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
})
const PORT = Number(process.env.PORT);

(async () => {
    try {
        await pool.getConnection();
        console.log('MySQL connected');
        app.listen(
            PORT, () => console.log(`Server running on port ${PORT}`));
        } catch (err) {
        console.error('MySQL connection failed', err);
        process.exit(1);
        }
})();