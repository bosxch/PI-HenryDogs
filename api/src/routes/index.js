const { Router } = require("express");
const axios = require("axios");
const { Raza, Temperamento } = require("../db");
const {apiKey} = process.env;
const router = Router();

// Las funciones son asincronas ya que esperan respuesta de la api o de la db

//--------------------------------------------------------------------------------------------
//esta funcion va a traer todos los datos de la api y como quiero que guarde la informacion en estado dogs, dentro del return en height y weight, la info viene en string "12 - 15" hago un split en "-", pregunto si tiene 2 valores en max guardo lo que quede desp de - y min el [0], esto va a ser para simplificar logicas en el front
const getApiInfo = async () => {

  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`); //Usamos axios, fetch en desuso
  const apiInfo = await apiUrl.data.map((dogs) => {
    return {
      id: dogs.id,
      name: dogs.name,
      heightMax : dogs.height.metric.split(" - ")[1]? dogs.height.metric.split(" - ")[1]
      : dogs.height.metric.split(" - ")[0],
      heightMin : dogs.height.metric.split(" - ")[0],
      weightMax: dogs.weight.metric.split(" - ")[1] ? dogs.weight.metric.split(" - ")[1]
      : dogs.weight.metric.split(" - ")[0],
      weightMin: dogs.weight.metric.split(" - ")[0],
      life_span: dogs.life_span,
      temperament: dogs.temperament,
      origin: dogs.origin,
      image: dogs.image.url,
      bred_for: dogs.bred_for,
    };
  });
  return apiInfo;
};
//-------------------------------------------------------------------------------
const getTemperaments = async () => {
  const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);
  const apiTemps = await api.data
    .map((dogs) => {
      return dogs.temperament;
    })
    .join() 
    .split(","); 

  const allTemps = [];
  
  apiTemps.map((temp)=>{
    if (!allTemps.includes(temp.trim() && temp)){ 
      allTemps.push(temp.trim());
    }
  });

  allTemps.map(async (temp) => {
    await Temperamento.findOrCreate({
      where: {
        name: temp,
      },
    });
  });
};
const dataBaseInfo = async () => {
 
  return await Raza.findAll({
    include: {
      model: Temperamento,
      attributes: ["name"],
      trough: {
        attributes: [],
      },
    },
  });
};
//--------------------------------------------------------------------------------
const getAllData = async () => {
 
  const apiInfo = await getApiInfo();
  const dbInfo = await dataBaseInfo();
  const apiDbInfo = apiInfo.concat(dbInfo);
  return apiDbInfo;
};
//---------------------------------ROUTES----------------------------------------------
router.get("/dogs", async (req, res) => {
  
  const { name } = req.query;
  const perros = await getAllData();
  if (name) {
    try {
      let perro = await perros.filter((perro) =>
        perro.name.toLowerCase().includes(name.toLowerCase())
      );
      return res.status(201).send(perro);
    } catch (err) {
      res.status(404).send("No se ha encontrado un perro con ese nombre");
    }
  } else {
    res.status(200).send(perros);
  }
});

router.get("/dogs/:id", async (req, res) => {
  

  const { id } = req.params;
  const perros = await getAllData();

  try {
    let perro = perros.find((e) => e.id.toString() === id);
    res.status(200).send(perro);
  } catch (err) {
    res.status(404).send("No se ha encontrado un perro con ese ID D:");
  }
});

router.post("/dogs", async (req, res) => {
  const {
    name,
    heightMin,
    weightMin,
    heightMax,
    weightMax,
    life_span,
    image,
    temperament,
    created_in_dogs,
  } = req.body;

  if (!name || !heightMin || !heightMax || !weightMax || !weightMin || !life_span || !image || !temperament) {
    res.status(404).send(new Error("Falta informacion necesaria"));
  }

  let dogCreated = await Raza.create({
    name,
    heightMin,
    weightMin,
    heightMax,
    weightMax,
    life_span,
    image,
    created_in_dogs,
  });
  let tempdb = await Temperamento.findAll({
    where: {
      name: temperament,
    },
  });
  dogCreated.addTemperamento(tempdb);
  res.status(200).send("Tu perro fue creado con exito!");
});

router.get("/temperaments", async (req, res) => {
  await getTemperaments();
  const alltemps = await Temperamento.findAll();
  const nameTemp = alltemps.map (temp => temp.name)
  res.status(200).json(nameTemp)
});

module.exports = router;
