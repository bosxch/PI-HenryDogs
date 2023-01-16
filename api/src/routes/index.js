const { Router } = require("express");
const axios = require("axios");
const { Raza, Temperamento } = require("../db");

const router = Router();

// Las funciones son asincronas ya que esperan respuesta de la api o de la db

//--------------------------------------------------------------------------------------------
//esta funcion va a traer todos los datos de la api y como quiero que guarde la informacion en estado dogs, dentro del return en height y weight, la info viene en string "12 - 15" hago un split en "-", pregunto si tiene 2 valores en max guardo lo que quede desp de - y min el [0], esto va a ser para simplificar logicas en el front
const getApiInfo = async () => {
  // Traemos toda la info de la API
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds"); //Usamos axios, fetch en desuso
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
  const api = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiTemps = await api.data
    .map((dogs) => {
      return dogs.temperament;
    })
    .join() // Tengo que usar join por como entra la info en la api ["Stubborn, Curious, Playful"] => "Stubborn, Curious, Playful"
    .split(","); // => [ 'Stubborn', ' Curious', ' Playful']

  const allTemps = [];
  
  apiTemps.map((temp)=>{
    if (!allTemps.includes(temp.trim() && temp)){ //La condicion es que ya lo tenga pusheado dentro de allTemps si no esta que lo agregue, trim simplemente lo qe hace es sacar todos los espacios blancos tabulaciones etc.
      allTemps.push(temp.trim());
    }
  });

  allTemps.map(async (temp) => {// aca hago lo mismo pero con la base de datos, findOrCreate es una func de sequelize o lo encuentra o lo crea..
    await Temperamento.findOrCreate({
      where: {
        name: temp,
      },
    });
  });
};
const dataBaseInfo = async () => {
  // Traemos toda la info de la Base de Datos
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
  // Concatenamos toda la informacion para unir nuestra DATA.
  const apiInfo = await getApiInfo();
  const dbInfo = await dataBaseInfo();
  const apiDbInfo = apiInfo.concat(dbInfo);
  return apiDbInfo;
};
//---------------------------------ROUTES----------------------------------------------
router.get("/dogs", async (req, res) => {
  //Recibimos por Query el name y filtramos dentro del array -- solicitudes de nombres de perro
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
  //Recibimos por params nuestro ID y hacemos Find dentro de nuestro array

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
    res.status(404).send("Falta informacion necesaria");
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
