const express = require("express");
const cheerio = require("cheerio");
const request = require("request");
const router = express.Router();
const top_movies_url = "https://thepiratebay10.org/browse/201/1/7/0";
const app = express();
const fs = require("fs");

router.get("/", (req, res) => {

    
  request(top_movies_url, function (error, response, html) {
    const $ = cheerio.load(html);

    if (!error && response.statusCode == 200) {
      let top_Titles = [];
      $("tbody .detName a").each((index, value) => {
        let link = $(value).text();

        top_Titles.push(link);
      });

      let top_Magnet = [];
      $("tbody  a").each((index, value) => {
        let link_M = $(value).attr("href");
        if (link_M.includes("magnet")) {
          top_Magnet.push(link_M);
        }
      });

      let top_Seeds = [];
      $(`#searchResult > tbody > tr:nth-child(n) > td:nth-child(3)`).each(
        (index, value) => {
          let link_S = $(value).text();
          top_Seeds.push(link_S);
        }
      );

      console.log(
        top_Seeds.length,
        "<<---seeds",
        top_Magnet.length,
        "top_Magnet",
        top_Titles.length
      );

      const top_Movies_JSON = {
        movies: top_Titles,
        magnet: top_Magnet,
        seeds: top_Seeds,
      };

      const topMOVIESfile = JSON.stringify(top_Movies_JSON);

      fs.writeFile("Top Movies.json", topMOVIESfile, (err) => {
        if (err) throw err;
      });
    }
  });

  res.sendFile(__dirname + "/Top Movies.json");
});

module.exports = router;
