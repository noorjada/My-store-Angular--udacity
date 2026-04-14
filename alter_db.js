const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'store',
    user: 'postgres',
    password: 'NOor0123'
});

async function run() {
    try {
        await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE');
        await pool.query("UPDATE users SET is_admin = TRUE WHERE email = 'noor@gmail.com'");
        console.log('Database updated successfully');
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
run();
