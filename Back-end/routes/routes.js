const express = require("express");
const router = express.Router();

const { getCakes, postCake, patchCake, deleteCake, getSpecificCake } = require('../controllers/links.js');

router.get('/get', getCakes);

router.get('/get/:name', getSpecificCake);

router.post('/add', postCake);

router.patch('/modify/:name', patchCake);

router.delete('/delete/:name', deleteCake);

module.exports = router;
