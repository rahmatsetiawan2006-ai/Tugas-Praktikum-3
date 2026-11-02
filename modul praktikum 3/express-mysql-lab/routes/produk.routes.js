const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produk.controller');
const ProdukModel = require('../models/produk.model');

router.get('/produk', produkController.getDaftarProduk);
router.get('/produk/tambah', produkController.getFormTambah);
router.post('/produk/tambah', produkController.postTambahProduk);

router.get('/produk/edit/:id', produkController.getFormEdit);
router.post('/produk/edit/:id', produkController.postUpdateProduk);

router.post('/produk/hapus/:id', produkController.postHapusProduk);

// Pengalaman 6: uji keamanan
router.get('/uji-keamanan', async (req, res) => {
    const inputPayload = req.query.kategori;

    // Skenario A: Kueri Rentan Injeksi
 const hasil = await ProdukModel.getByKategoriSecure(inputPayload);

    // Skenario B: Kueri Aman Prepared Statement
    // const hasil = await ProdukModel.getByKategoriSecure(inputPayload);

    res.json({
        input: inputPayload,
        totalDataDitemukan: hasil.length,
        data: hasil
    });
});

module.exports = router;