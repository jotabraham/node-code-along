"use strict";

// need to import express library into this file
// REQUIRE is part of common JS stardard to write code in one file and use it in another
const express = require("express");
// set up a router
// controls all the different routes/endpoints/paths
const routes = express.Router();


const movies = [
   { id: 1, title: "Forrest Gump", year: 1994, animated: false },
   { id: 2, title: "Aladdin", year: 1992, animated: true },
   { id: 3, title: "Knives Out", year: 2019, animated: false },
   { id: 4, title: "Inside Out", year: 2015, animated: true },
   { id: 5, title: "Princess Bride", year: 1987, animated: false },
];
let nextId = 6;

// GET /movies - respond with a JSON array of movies
routes.get("/movies", (req, res) => {
   res.json(movies);
});

// below :id is acting as a path parameter
routes.get("/movies/:id", (req, res) => {
   // below .id must match :id above
   // could be anything
   // without parseInt below, id would always return as a string
   // we want a number to match data in the array above
   const id = parseInt(req.params.id);
   const movie = movies.find(movie => movie.id === id);
   if (movie) {
      // no need to set OK status because it defaults to 200
      res.json(movie);
   } else {
      res.status(404);
      res.send(`No movie with id ${id} exists.`);
   }
   res.json(movie);
})

// CREATE - adding a movie to array
// need to know details/data about movie
routes.post("/movies", (req, res) => {
   // below automatically takes in JSON body from requests then stores in movie var
   // however we want the ID to increment so need to creat var under array
   // and ++ in the post here
   const movie = req.body;
   movie.id = nextId++;
   movies.push(movie);

   res.status(201);
   res.json(movie);
})

// UPDATE nothin

// DELETE
routes.delete("/movies/:id", (req, res) => {
   console.log("begin yeet")
   const id = parseInt(req.params.id);
   const index = movies.findIndex(movie => movie.id === id);
   if (index !== -1) {
      movies.splice(index, 1);
   }
   res.status(204);
   console.log("end yeet")
   // even if response is empty we need it
   res.send();
})



// export routes for use in server.js
// goes at end of file
module.exports = routes;
