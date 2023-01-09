const { Router } = require("express");
const router = Router();
const axios = require("axios");
const api = "https://api.thedogapi.com/v1/breeds";
const { Temperament } = require("../db");

//En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí. O sea una vez que las traigo las guardo en la base de datos y trabajo desde ahi.
router.get("/temperaments", async (req, res) => {
  try {
    const temperamentsFromDB = await Temperament.findAll();
    if (temperamentsFromDB >= 1) res.json(temperamentsFromDB);

    const apiInfo = await axios.get(api);
    let everyTemperament = apiInfo.data
      ?.map((dog) => (dog.temperament ? dog.temperament : null))
      .map((dog) => dog && dog.split(", ")); //uno cadenas y separo por comas
    const mySet = [...new Set(everyTemperament.flat())]; // Set es un objeto que contiene valores únicos
    let temperamentsToDB = mySet.forEach((t) => {
      if (t) {
        Temperament.findOrCreate({//si esta no lo crea y sino lo crea
          where: { name: t },
        });
      }
    });
    temperamentsToDB = await Temperament.findAll();
    res.status(200).json(temperamentsToDB);
  } catch (error) {
    res.status(404).send("No temperaments found");
  }
});

module.exports = router;
























//entro a la api, mapeo la info, y lo que hace es traerme los temperaments uno por uno, porque los quiero guardar asi.
//entra al string de, lo mapena y lo saca aparte, va desarmando los string para devolverme todos los temperament

// router.get("/temperaments", async (req, res) => {
//     try {
//       const temperamentsFromDB = await Temperament.findAll();
//       if (temperamentsFromDB >= 1) res.json(temperamentsFromDB);
  
//       const apiInfo = await axios.get(api);
//       let everyTemperament = apiInfo.data
//         ?.map((dog) => (dog.temperament ? dog.temperament : null))
//         .map((dog) => dog && dog.split(", ")); //
//       const mySet = [...new Set(everyTemperament.flat())]; // Set es un objeto que contiene valores únicos
//       let temperamentsToDB = mySet.forEach((t) => {
//         if (t) {
//           Temperament.findOrCreate({
//             where: { name: t },
//           });
//         }
//       });
//       temperamentsToDB = await Temperament.findAll();
//       res.status(200).json(temperamentsToDB);
//     } catch (error) {
//       res.status(404).send("No temperaments found");
//     }
//   });
  
//   module.exports = router;