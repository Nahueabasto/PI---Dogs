const { Router } = require("express");
const { Dogs, Temperament } = require("../db");
const router = Router();
const axios = require("axios");

router.get("/dogs/:idRaza", async (req, res) => {
  const { idRaza } = req.params;

  if (idRaza.includes("-")) {
    let dogDB = await Dogs.findOne({
      where: {
        id: idRaza,
      },
      include: Temperament,
    });
    dogDB = JSON.stringify(dogDB);//convierte un objeto o valor de JavaScript en una cadena de texto JSON
    dogDB = JSON.parse(dogDB);// obtengo un json del arreglo donde aloje todos los dogs con sus temperamentos
    //analiza una cadena de texto como JSON, transformando opcionalmente el valor producido por el análisis.

    //dejo un array con los nombres de temp solamente
    dogDB.temperaments = dogDB.temperaments.map((d) => d.name + ", ");
    res.json(dogDB);
  } else {
    try {
      const response = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${idRaza}`
      );

      let {
        id,
        name,
        weight,
        height,
        life_span,
        temperament,
        reference_image_id,
        breed_group,
      } = response.data;

      //CONVIERTO TODO A JSON CON SOLAMENTE LOS CAMPOS QUE ME PIDIERON Y LO RETORNO
      return res.json({
        id,
        name,
        weight: weight.metric,
        height: height.metric,
        life_span,
        temperaments: temperament,
        breed_group,
        image: `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`,
      });
    } catch (err) {
      res.sendStatus(500);
      throw new Error("error");
    }
  }
});

module.exports = router;


































// const { Router } = require("express");
// const { Dogs, Temperament } = require("../db");
// const router = Router();
// const axios = require("axios");
// const { getAllDogs } = require("./controllers/DogsInfo");


// router.get("/dogs/:id", async (req, res) => {
//     const id = req.params.id; 
//     //const { id } = req.params;

//     const dogsTotal = await getAllDogs(); //Me traigo todos los dogs
//     if(id){
//         let dogsId = await dogsTotal.filter(el => el.id == id); //dentro de todos esos dogs filtrame el que tenga el id que te estoy pasando.
//         dogsId.length ?
//         res.status(200).json(dogsId) : 
//         res.status(404).send("No encontre ese dogs")
//     }

// });

// module.exports = router;