const { Router } = require("express");
const router = Router();
const { allInfo } = require("./controllers/DogsInfo");


router.get("/dogs", async (req, res) => {
  if (req.query.name) {
    let { name } = req.query;//busca si hay un name por query, una constante name que pregunta si hay un name con esta propiedad, lo que pido es lo que me pasen por url //que me traiga los dogs por query es con respecto a lo que escriba en la url, y esa ruta se usa para buscar por nombre-
    const dogs = await allInfo();
    const result = dogs.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );// dentro del filtro le digo, agarra ese nombre, fijate si incluye ese name, o sea lo que le pase por query

    if (result.length >= 1) {
      res.status(200).json(result);
    } else {
      res.status(400).json("no dogs try again");
    }
  } else {
    try {
      let total = await allInfo();
      res.status(200).json(total);
    } catch (error) {
      res.status(400).json(error);
    }
  }
});

module.exports = router;























// const { Router } = require("express");
// const router = Router();
// const { getAllDogs } = require("./controllers/DogsInfo");
// const axios = require("axios");

// router.get("/dogs", async (req, res) => {
//     const name = req.query.name; //busca si hay un name por query, una constante name que pregunta si hay un name con esta propiedad, lo que pido es lo que me pasen por url //que me traiga los dogs por query es con respecto a lo que escriba en la url, y esa ruta se usa para buscar por nombre-
//     let dogTotal = await getAllDogs();
//     if(name) {
//         let dogName = await dogTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())) // dentro del filtro le digo, agarra ese nombre, fijate si incluye ese name, o sea lo que le pase por query
//         dogName.length ? //pregunto si encuentro algo aca
//         res.status(200).send(dogName) :
//         res.status(404).send("No esta el dog")
//     } else {
//         res.status(200).send(dogTotal)
//     }
// })

// module.exports = router;
