

//el query se pasa por url
//el body se pasa un un post por ejemplo aca, el body es lo que yo le paso para completar un post por informacion, si lo queres hacer desde el front el body te va a llegar mediante un formulario.

const { Router } = require("express");
const router = Router();
const { Dogs, Temperament } = require("../db");
const express = require('express');

router.post("/dogs", async (req, res) => {
  let { name, life_span, weight, height, image, temperament } = req.body;

  const capitalizar = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1); //devuelve en un nuevo String el carácter UTF-16 de una cadena. El toUpperCase() método devuelve el valor convertido en mayúsculas de la cadena que realiza la llamada.
  };

  try {
    const dogCREATED = await Dogs.findOrCreate({//findOrCreate() es un método de consulta que intenta buscar una entrada en la tabla o crear una nueva entrada cuando no se encuentra nada.
      //devuelvo un array (OJOOO!!!!)
      where: {
        name: capitalizar(name),
        weight,
        height,
        life_span,
        image: image,
      },
    });
    await dogCREATED[0].setTemperaments(temperament); // relaciono ID temperaments al dog creado
    
    res.status(200).json(dogCREATED);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;



























// const { Dogs, Temperament } = require("../db");
// const express = require('express');


// router.post("/dogs", async (req, res) =>{
//     let { name, life_span, weight, height, image, temperament } = req.body;

//     let dogsCreate = await Dogs.create ({
//         name, life_span, weight, height, image, temperament
//     })


// //el temperament lo tengo que encontrar en un modelo que ya tengo 
// let temperamentDb = await Temperament.findAll({
//     where: { name: temperament } //al temperament que me llega por body
// }); //dentro de ese modelo encontra todas los temperament que coincidan con lo que le paso por body arriba en temperament

//  dogsCreate.addTemperament(temperamentDb) //a dogsCreate agregale el temperament, van a ser las que coicidieron con el nombre, o sea temperamentDb. //Temperament de la tabla de base de datos
//  res.send("Dogs creado por exito")
// })

// module.exports = router;
    