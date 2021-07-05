const express = require("express");
const cheerio = require("cheerio");
const request = require("request");
const cron = require("node-cron");
const app = express();
const cors = require("cors");
const date = new Date();

app.use(cors());

const top_movies = require("./Top torrent/Top movies");
const top_shows = require("./Top torrent/Top Shows");
const top_anime = require("./Top torrent/Top anime");
const top_games = require("./Top torrent/Top  games");

const pirate_search = require("./Search-sites/Pirate bay");
const nyaa_search = require("./Search-sites/Nyaa search");
const rarbg_search = require("./Search-sites/RARBG search");
const X1337_search = require("./Search-sites/1337x Search");
app.use("/top-movies", top_movies);
app.use("/top-shows", top_shows);
app.use("/top-anime", top_anime);
app.use("/top-games", top_games);

app.use("/pirate-search", pirate_search);
app.use("/nyaa-search", nyaa_search);
app.use("/rarbg-search", rarbg_search);
app.use("/1337x-search", X1337_search);
app.use("/1337x/", X1337_search);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/page.html");
  console.log(date)
});

app.listen(3001, () => {
  console.log(` server running on port -> http://localhost:3001`);
});
