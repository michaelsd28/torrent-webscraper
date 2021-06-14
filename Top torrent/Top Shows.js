const express = require("express");
const cheerio = require("cheerio");
const request = require("request");
const router = express.Router();
const top_shows_url = "https://thepiratebay10.org/top/205";
const app = express();
const fs = require("fs");

router.get("/", (req, res) => {

    
  request(top_shows_url, function (error, response, html) {
    const $ = cheerio.load(html);

    if (!error && response.statusCode == 200) {
      let top_Titles = [];
      $("tbody .detName a").each((index, value) => {
        let link = $(value).text();

        if(top_Titles.length<26){

            top_Titles.push(link);
        }
  
      });

      let top_Magnet = [];
      $("tbody  a").each((index, value) => {
        let link_M = $(value).attr("href");
        if (link_M.includes("magnet")) {

            if(top_Magnet.length<26){

                top_Magnet.push(link_M);
            }

        }
      });

      let top_Seeds = [];
      $(`#searchResult > tbody > tr:nth-child(n) > td:nth-child(3)`).each(
        (index, value) => {
          let link_S = $(value).text();
          if(top_Seeds.length<26){

            top_Seeds.push(link_S);
        }
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
        shows: top_Titles,
        magnet: top_Magnet,
        seeds: top_Seeds,
      };

      const topMOVIESfile = JSON.stringify(top_Movies_JSON);

      fs.writeFileSync(__dirname+"/Top Shows.json", topMOVIESfile, (err) => {
        if (err) throw err;
      });
    }
  });

  res.sendFile(__dirname + "/Top Shows.json");
});

module.exports = router;
