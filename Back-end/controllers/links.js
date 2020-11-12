const express = require('express');
const cakesModel = require('../models/links.js');

const getCakes = (req, res) => {
  cakesModel.find().sort({ name: 1 })
    .then(cakeDoc => {
      let arrayCake = []
      cakeDoc.map((cake) => { arrayCake.push({ "id": cake._id, "name": cake.name }) });
      res.json(arrayCake);
    })
    .catch(error => {
      console.log(error);
    });
};

const getSpecificCake = (req, res) => {
  let cakeId = req.params.id;
  cakesModel.find({ _id: cakeId }, (err, arr) => {
    if (arr.length !== 0) {
      res.json(arr[0]);
    } else {
      res.send('The id entered not exist');
    }
  })
    .catch(error => {
      console.log(error);
    });
};

const postCake = (req, res) => {
  const newCake = new cakesModel({ ...req.body });
  cakesModel.find({ name: req.body.name }, (err, arr) => {
    console.log(arr);
    if (arr.length === 0) {
      newCake.save()
        .then(() => {
          console.log("Is aggregated the cake correctly")
          res.json({
            message: "Is aggregated the cake correctly",
            cake: newCake
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      res.send('Your cake name is registered, please enter a new cake name.')
    }
  })
    .catch(error => {
      console.log(error);
    });
  ;
}

const patchCake = (req, res) => {
  let cakeInfo = req.body
  let cakeId = req.params.id;
  cakesModel.findOneAndUpdate({ _id: cakeId }, { ...req.body }, (err, arr) => {
    if (arr) {
      res.json({
        message: "Is actualiced the cake correctly",
        newcake: cakeInfo,
        beforeCake: arr
      })
    } else {
      res.send('<p>id not found</p>')
    }
  })
    .catch(error => console.log('error'));
}

const deleteCake = (req, res) => {
  let cakeId = req.params.id;
  cakesModel.findOneAndRemove({ _id: cakeId }, (err, obj) => {
    if (obj) {
      res.json({
        message: "The cake was eliminated correctly",
        cake: obj
      });
    } else {
      res.send('The id of the cake was send not exist');
    }
  })
    .catch(error => console.log(error));
}

module.exports = { getCakes, postCake, patchCake, deleteCake, getSpecificCake };
