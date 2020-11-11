const express = require('express');
const cakesModel = require('../models/links.js');

const getCakes = (req, res) => {
  cakesModel.find().sort({ name: 1 })
    .then(cakeDoc => {
      let arrayCake = []
      cakeDoc.map((cake) => { arrayCake.push(cake.name) });
      console.log(arrayCake);
      res.json(arrayCake);
    })
    .catch(error => {
      console.log(error);
    });
};

const getSpecificCake = (req, res) => {
  let cakeName = req.params.name;
  cakesModel.find({ name: cakeName }, (err, arr) => {
    if (arr.length !== 0) {
      res.json(arr[0]);
    } else {
      res.send('The name entered not exist');
    }
  })
    .catch(error => {
      console.log('The item not exist', error);
    });
};

const postCake = (req, res) => {
  const newCake = new cakesModel({ ...req.body });
  cakesModel.find({ name: req.body.name }, (err, arr) => {
    console.log(arr);
    if (arr.length === 0) {
      newCake.save()
        .then(() => {
          console.log("Is aggregated the cake correctrly")
          res.json({
            message: "Is aggregated the cake correctrly",
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
  let cakeName = req.params.name;
  cakesModel.findOneAndUpdate({ "name": cakeName }, { ...req.body })
    .then(cake => {
      res.json({
        message: "Is actualiced the cake correctly",
        newcake: cakeInfo,
        beforeCake: cake

      })
    })
    .catch(error => console.log(error));
}

const deleteCake = (req, res) => {
  let name = req.params.name;
  cakesModel.findOneAndRemove({ "name": name }, (err, obj) => {
    if (obj) {
      res.json({
        message: "The cake was eliminated correctly",
        cake: obj
      });
    } else {
      res.send('The name of the cake was send not exist');
    }
  })
    .catch(error => console.log(error));
}

module.exports = { getCakes, postCake, patchCake, deleteCake, getSpecificCake };
