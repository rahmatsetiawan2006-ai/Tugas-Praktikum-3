const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/database');
const produkRoutes = require('./routes/produk.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', produkRoutes);

app.use((req, res) => {
    res.status(404).send('Halaman tidak ditemukan.');
});
db.query('SELECT 1 + 1 AS result')
    .then(() => {
        console.log('[DATABASE] Terhubung ke MySQL Pool secara aman.');
        app.listen(PORT, () => console.log(`[SERVER] Aktif di http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('[DATABASE ERROR] Gagal terhubung ke MySQL:', err.message);
    });