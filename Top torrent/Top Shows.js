const express = require("express");
const cheerio = require("cheerio");
const router = express.Router();
const top_shows_url = "https://thepiratebay10.org/top/205";
const got = require("got");
const cron = require("node-cron");
const fs = require("fs");
const date = new Date();

//cron.scheduleJob("* * * * *", async () => {
//cron.scheduleJob(" 0 1 * * *", async () => {

  cron.scheduleJob(" 0 1 * * *", async () => {


  const html = await got(top_shows_url);
  const $ = cheerio.load(html.body);




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

      fs.writeFileSync(__dirname+"/z_Top Shows.json", topMOVIESfile, (err) => {
        if (err) throw err;
      });
      console.log(`top shows* file updated on ${date}`)


});


router.get("/", (req, res) => {



  res.sendFile(__dirname + "/z_Top Shows.json");

  console.log("sent file /z_Top Shows.json");
});

module.exports = router;
