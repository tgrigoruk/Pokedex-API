const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.listen(process.env.PORT || 5002, function (err) {
  if (err) console.log(err);
});

const pokemonDB = require("./pokemon.json");

app.get("/", function (req, res) {
  res.send(`<h1>Pokemon API</h1>`);
});

app.get("/pokemon/:id", function (req, res) {
  pokemon = pokemonDB.pokemon.filter((p) => {
    return p.id == req.params.id || p.name == req.params.id;
  })[0];
  // console.log("requesting: " + pokemon.name);
  pokemon ? res.send(pokemon) : res.send(false);
});

app.get("/search/:searchType/:searchParam", function (req, res) {
  let searchType = req.params.searchType;
  let searchParam = req.params.searchParam;

  if (searchParam === "all") {
    res.send(pokemonDB[searchType]);
  } else {
    searchTypes = searchType == "type" ? "types" : "abilities";
    matchingPokemon = pokemonDB.pokemon.filter((pokemon) => {
      let plist = false;
      pokemon[searchTypes].forEach((searchTypeList) => {
        // console.log(searchTypeList[searchType].name);
        if (searchTypeList[searchType].name == searchParam) plist = true;
      });
      return plist;
    });
    res.send(matchingPokemon);
  }
});
