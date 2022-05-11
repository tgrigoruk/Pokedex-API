const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const bodyparser = require("body-parser");
app.use(
  bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: "50mb",
    extended: true,
  })
);

app.listen(process.env.PORT || 5002, function (err) {
  if (err) console.log(err);
});

const pokemonDB = require("./pokemon.json");

app.get("/pokemon/:id", function (req, res) {
  pokemon = pokemonDB.pokemon.filter((p) => {
    return p.id == req.params.id || p.name == req.params.id;
  })[0];
  res.send(pokemon);
});

app.get("/type", function (req, res) {
  res.send(pokemonDB.type);
});
app.get("/ability", function (req, res) {
  res.send(pokemonDB.type);
});
app.get("/pokemon-color", function (req, res) {
  res.send(pokemonDB.type);
});
