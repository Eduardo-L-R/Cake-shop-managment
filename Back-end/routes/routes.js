const express = require("express");

var router = express.Router();

router.get("/hola", (req, res) => {
    console.log('hola');
    res.send('hola');
});


module.exports = router;