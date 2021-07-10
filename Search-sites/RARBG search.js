const express = require("express");
const cheerio = require("cheerio");
const router = express.Router();
const pirate_search = "https://rarbgdata.org/torrents.php?search=";
const search_order = "&order=seeders&by=DESC"
const cron = require('node-schedule');
const fs = require("fs");
const got = require("got");
const changeLink = require("./search link request");

router.get("/:id", async (req, res) => {

  try {
    const myParams = req.params.id;
    const search_pirate = changeLink.linkRequestNyaa(pirate_search + myParams);

    const html = await got(search_pirate+search_order);
    const $ = cheerio.load(html.body);

    /* search title */

    let top_Titles = [];
    $(
      "body > table:nth-child(6) > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td > table.lista2t > tbody > tr:nth-child(n) > td:nth-child(2) > a:nth-child(1)"
    ).each((index, value) => {
      let link = $(value).text();

      if(link!=="File"){

        top_Titles.push(link);
      }

 
    });




    let top_Magnet = [];
    $("body > table:nth-child(6) > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td > table.lista2t > tbody > tr:nth-child(n) > td:nth-child(2) > a:nth-child(1)").each((index, value) => {
      let link_M = $(value).attr("href");
        top_Magnet.push(link_M);
    });




    console.log(top_Titles,"top_Titles",top_Magnet,"top_Magnet")


//     let top_Seeds = [];
//     $(`#searchResult > tbody > tr:nth-child(n) > td:nth-child(3)`).each(
//       (index, value) => {
//         let link_S = $(value).text();
//         top_Seeds.push(link_S);
//       }
//     );

//     let top_type = [];
//     $(
//       `#searchResult > tbody > tr:nth-child(n) > td.vertTh > center > a:nth-child(1)`
//     ).each((index, value) => {
//       let link_S = $(value).text();
//       top_type.push(link_S);
//     });

//     let top_sub_type = [];
//     $(
//       `#searchResult > tbody > tr:nth-child(n) > td.vertTh > center > a:nth-child(3)`
//     ).each((index, value) => {
//       let link_S = $(value).text();
//       top_sub_type.push(link_S);
//     });

//     let storage = [];
//     let newString1 = [];
//     $(`#searchResult > tbody > tr:nth-child(n) > td:nth-child(2) > font`).each(
//       (index, value) => {
//         let link_S = $(value).text();

//         newString1.push(link_S.split(", "));

//         storage.push(link_S);
//       }
//     );

//     let sizeONLY = [];

//     const multiMAP = newString1.map((item) => {
//       item.map((newItem) => {
//         if (newItem.includes("Size")) {
//           sizeONLY.push(newItem.substring(5));
//         }
//       });
//     });

//     const top_Movies_JSON = {
//       movies: top_Titles,
//       magnet: top_Magnet,
//       seeds: top_Seeds,
//       type: top_type,
//       subtype: top_sub_type,
//       size: sizeONLY,
//     };

//     res.json(top_Movies_JSON);





res.send(`RARBG here ${req.params.id}`)

} catch (error) {
    console.log(error);
  }


});

module.exports = router;
