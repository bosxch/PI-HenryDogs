const { Router } = require('express');
const router = Router();
const axios = require('axios');
const express = require('express');
const { Dog, Temperaments } = require('../db');
const {apiKey} = process.env;



const urlApi = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

// --Función para traer la data de la api-- //
const getApiData = async () => {
    const apiData = await axios.get(urlApi);
    const apiInfo = apiData.data.map(el => {
        let temperamentArray = [];
        if (el.temperament) {
            temperamentArray = el.temperament.split(', ');
        }
        let heightArray = [];
        if(el.height.metric) {
            heightArray = el.height.metric.split(' - ');
        }
        let weightArray = [];
        if (el.weight.metric) {
            weightArray = el.weight.metric.split(' - ');
        }
        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
        }
    })
    return apiInfo;
}

// --Función para traer la data de la db-- //
const getDbData = async () => {
    return await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ['name'], 
            through: {
                attributes: [],
            },
        }
    })
}

// --Función para unir la data de la Api con la de la Db-- //
const allDataDogs = async () => {
    const datafromApi = await getApiData();
    const datafromDb = await getDbData();
    const allData = [...datafromApi, ...datafromDb];
    return allData;
}

// --End-Points-- //

//Toma el '/dogs' y el '/dogs?name="..."' y trae lo correspondiente//
router.get('/', async (req,res) => {
    const {name} = req.query;
    const allDogs = await allDataDogs();
    if (name) {
        const dogQuery = allDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogQuery.length ? res.status(200).send({dogQuery}) : res.status(400).send(`The dog breed ${dogQuery} was not found`);
    } else {
        res.status(200).send(allDogs);
    }
    })

//Busca un perro por su id//
router.get('/:id', async (req,res) => {
    const {id} = req.params;
    const allDogs = await allDataDogs();
    const dogId = allDogs.filter(el => Number(el.id) === Number(id))
    if (dogId.length) {
        res.status(200).send(dogId)
    } else {
    res.status(400).send(`The dog with id ${id} was not found`)
    }
})

//Crea un perro en la db con lo recibido por body//
router.post('/', async (req,res) => {
    const {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperaments,
        image
     } = req.body
     

     if (!name || !min_height || !max_height || !min_weight || !max_weight || !life_span || !temperaments) res.status(400).send('Data is not complete')
       
    const Height = []
    const minHeight = min_height;
    const maxHeight = max_height;
    Height.push(minHeight, maxHeight)
 
    const Weight = []
    const minWeight = min_weight;
    const maxWeight = max_weight;
    Weight.push(minWeight, maxWeight)

       const dogCreated = await Dog.create({
            name: name,
            height: Height,
            weight: Weight,
            life_span: life_span,
            image: image ? image : 'https://cdn.pixabay.com/photo/2014/03/25/16/24/paw-296964_960_720.png'
       });

       let dogTemperaments = await Temperaments.findAll({
        where: {name : temperaments},
       })

       dogCreated.addTemperament(dogTemperaments);

       res.status(200).send('The dog was created succesfully!')

})


module.exports = router;