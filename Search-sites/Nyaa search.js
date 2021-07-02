const express = require("express");
const cheerio = require("cheerio");
const router = express.Router();
const nyaa_order = "&s=seeders&o=desc";
const pirate_search = "https://nyaa.si/?f=0&c=0_0&q=";
const cron = require("node-cron");
const fs = require("fs");
const got = require("got");
const changeLink = require("./search link request");
const { type } = require("os");

router.get("/:id", async (req, res) => {
  try {
    const myParams = req.params.id;
    const search_pirate = changeLink.linkRequestNyaa(pirate_search + myParams);

    const html = await got(search_pirate + nyaa_order);

    console.log(search_pirate + nyaa_order, "html  -  request");
    const $ = cheerio.load(html.body);

    /* search title */
    /* title */
    let top_Titles = [];
    $(
      "body > div > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(2) > a:nth-child(n)"
    ).each((index, value) => {
      let link = $(value).attr("title");

      if (!link.includes("comment")) {
        top_Titles.push(link);
      }
    });

    /* top_magnet */
    let top_Magnet = [];
    $(
      "body > div > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(3) > a:nth-child(2)"
    ).each((index, value) => {
      let link_m = $(value).attr("href");

      if (link_m.includes("magnet")) {
        top_Magnet.push(link_m);
      }
    });

    let top_Seeds = [];
    $(
      `body > div > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(6)`
    ).each((index, value) => {
      let link_S = $(value).text();
      top_Seeds.push(link_S);
    });

    let top_type = [];
    $(
      `body > div > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(1) > a > img`
    ).each((index, value) => {
      let link_S = $(value).attr("alt");
      top_type.push(link_S);
    });

    //   let top_sub_type = [];
    //   $(`#searchResult > tbody > tr:nth-child(n) > td.vertTh > center > a:nth-child(3)`).each(
    //     (index, value) => {
    //       let link_S = $(value).text();
    //       top_sub_type.push(link_S);
    //     }
    //   );

    /* size - storage */
    let storage = [];
    $(
      `body > div > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(4)`
    ).each((index, value) => {
      let link_S = $(value).text();

      storage.push(link_S);
    });





    const top_Movies_JSON = {
      movies: top_Titles,
      magnet: top_Magnet,
      seeds: top_Seeds,
      type: top_type,
      // subtype: top_sub_type,
      size: storage,
    };

    res.json(top_Movies_JSON);
  } catch (error) {
    console.log(error,"error");
  }
});

module.exports = router;
