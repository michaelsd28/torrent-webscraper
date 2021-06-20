const express = require("express");
const cheerio = require("cheerio");
const router = express.Router();
const pirate_search = "https://m.thepiratebay10.org/search/";
const cron = require("node-cron");
const fs = require("fs");
const got = require("got");
const changeLink = require("./search link request")




router.get("/:id", async (req, res) => {

    const myParams = req.params.id;
    const search_pirate = changeLink.linkRequest( pirate_search+myParams)

    const html = await got(search_pirate);
    const $ = cheerio.load(html.body);


    /* search title */


    let top_Titles = [];
  $("#searchResult > tbody > tr:nth-child(n) > td:nth-child(2) > div > a").each((index, value) => {
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


  let top_type = [];
  $(`#searchResult > tbody > tr:nth-child(n) > td.vertTh > center > a:nth-child(1)`).each(
    (index, value) => {
      let link_S = $(value).text();
      top_type.push(link_S);
    }
  );


  let top_sub_type = [];
  $(`#searchResult > tbody > tr:nth-child(n) > td.vertTh > center > a:nth-child(3)`).each(
    (index, value) => {
      let link_S = $(value).text();
      top_sub_type.push(link_S);
    }
  );




  const top_Movies_JSON = {
    movies: top_Titles,
    magnet: top_Magnet,
    seeds: top_Seeds,
    type:top_type,
    subtype: top_sub_type
  };





    res.json(top_Movies_JSON);
  

  });





  
  module.exports = router;