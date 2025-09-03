import app from './app.ts';
import { pool } from './dbconfig.ts';


const PORT = Number(process.env.PORT || 4000);

(async () => {
try {
    await pool.getConnection();
        console.log('MySQL connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('MySQL connection failed', err);
        process.exit(1);
    }
})();