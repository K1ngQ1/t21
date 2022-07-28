const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const requestPack = require("request");
const cors = require("cors");
const helmet = require('helmet');
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');

//main search api
const itunes_API = "https://itunes.apple.com/search?country=za&";

//MIDDLEWARE

app.use(cors());
app.use(helmet())
//ARRAY FOR STORING USER FAV

var favArray = [];



if (process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*',(req,res)=>
{res.sendFile(path.resolve(__dirname,
'frontend', 'build','index.html'));
});
}



// ROUTES




//! Get
//initial load sends this music
app.get("/api", (req, res) => {
  requestPack(
    `${itunes_API}term=lorna+shoRe&limit=30`,
    (error, response, body) => {
      const songs = JSON.parse(body);
      const results = songs.results;
      res.send(results);
    }
  );
});

//sends user's favourite list
app.get("/api/fav", (req, res) => {
  res.send(favArray);
});

//sends users search results to front end with the search api results
app.get("/api/search", (req, res) => {
  const search_query = req.query.s_params;
  const c_type = req.query.c_type;
  console.log(search_query, c_type);
  requestPack(
    `${itunes_API}term=${search_query}&media=${c_type}&limit=30`,
    (error, response, body) => {
      const songs = JSON.parse(body);
      const results = JSON.stringify(songs.results);
      res.send(results);
    }
  );
});

//body parser for the post and delete
app.use(bodyParser.json());

//! Post

//receives items and reads them to array
app.post("/api", (req, res) => {
  const body = req.body;
  favArray.push(body);
  console.log(favArray);
  res.send(favArray);
});

//! Delete

//deletes items from array and sends them to the user
app.delete("/api/:id", (req, res) => {
  const item = req.params.id;
  favArray = favArray.filter((i) => i.trackId != item);
  console.log(favArray);
  res.send(favArray);
});

const PORT = process.env.PORT || 8080;
// creates port for server and then tells the app to listen on that port and report back to the user where the port is in the console.
app.listen(PORT, () =>
  console.log(`It's alive on http://localhost:${PORT}/api`)
);


module.exports = app
