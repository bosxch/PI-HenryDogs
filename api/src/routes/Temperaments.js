const { Router } = require('express');
const router = Router();
const axios = require('axios');
const express = require('express');
const { Dog, Temperaments } = require('../db');
const {apiKey} = process.env;

const urlApi = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

router.get('/', async (req,res) => {
    const temperamentsApi = await axios.get(urlApi);
    const temperamentsData = temperamentsApi.data.map(el => el.temperament);
    const temperaments = temperamentsData.toString().split(',');
    temperaments.forEach(el => {
        let t = el.trim();
        Temperaments.findOrCreate({
            where: {name : t}
        });
    });
    const allTemperaments = await Temperaments.findAll();    
    res.status(200).send(allTemperaments);
  //  res.send('soy get de /temperaments')
})

module.exports = router;