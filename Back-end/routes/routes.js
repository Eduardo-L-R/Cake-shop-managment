const express = require("express");
const router = express.Router();

const { getCakes, postCake, patchCake, deleteCake, getSpecificCake } = require('../controllers/links.js');

router.get('/', (req, res) => {
  res.send(
    "<h2>endpoints avaibles:</h2>" +
    "<ul>" +
    "<li>method:get in / , endpoints acaibles.</li>" +
    "<li>method:post in /cakes , add a cake to the database.</li>" +
    "<li>method:get in /cakes, obtain array of cakes.</li>" +
    "<li>method:get in /cakes/:id , obtain information specific of the cake</li>" +
    "<li>method:patch in /cakes/:id , modify a cake in the database.</li>" +
    "<li>method:delete in /cakes/:id , delete the cake indicated in the database.</li>" +
    "</ul>");
});

router.get('/cakes', getCakes);

router.get('/cakes/:id', getSpecificCake);

router.post('/cakes', postCake);

router.patch('/cakes/:id', patchCake);

router.delete('/cakes/:id', deleteCake);

module.exports = router;
