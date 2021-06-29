const express = require("express");
const cheerio = require("cheerio");
const router = express.Router();
const pirate_search = "https://1337x.to/search/";
const cron = require("node-cron");
const fs = require("fs");
const got = require("got");
const changeLink = require("./search link request");
const X1337_pre_link = "https://1337x.to";
const redirect_link = "http://localhost:3001/1337x/redirect/"

router.get("/:id", async (req, res) => {
  try {
    const myParams = req.params.id;
    const search_pirate = changeLink.linkRequestNyaa(
      pirate_search + myParams + "/1/"
    );

    const html = await got(search_pirate);
    const $ = cheerio.load(html.body);



    console.log(search_pirate, "search_pirate");
    /* search title */

    let top_Titles = [];
    $(
      "body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr:nth-child(n) > td.coll-1.name > a:nth-child(2)"
    ).each((index, value) => {
      let link = $(value).text();

      top_Titles.push(link);
    });



    let top_Magnet = [];
    $(
      "body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr:nth-child(n) > td.coll-1.name > a:nth-child(2)"
    ).each((index, value) => {
      let link_M = $(value).attr("href");


      let fake_link = changeLink.slashFAKE( X1337_pre_link + link_M)
    
       redirect_link
    

      top_Magnet.push( redirect_link +fake_link );
    });

    let top_Seeds = [];
    let top_type = [];
    let top_sub_type = [];
    $(
      `body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr:nth-child(n) > td.coll-2.seeds`
    ).each((index, value) => {
      let link = $(value).text();
      top_Seeds.push(link);
      top_type.push("1337x");
      top_sub_type.push("torrent");
    });

    let storage = [];

    $(
      `body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr:nth-child(n) > td`
    ).each((index, value) => {
      let link_S = $(value).text();

      let indexof = link_S.indexOf("B") + 1;

      if (
        link_S.includes("KB") ||
        link_S.includes("MB") ||
        link_S.includes("GB")
      ) {
        storage.push(link_S.substring(0, indexof));
      }
    });

    const top_Movies_JSON = {
      movies: top_Titles,
      magnet: top_Magnet,
      seeds: top_Seeds,
      type: top_type,
      subtype: top_sub_type,
      size: storage,
    };

    res.json(top_Movies_JSON);
  } catch (error) {
    console.log(error);
  }
});










router.get("/redirect/:torrentRedirect", async (req,res)=>{

  try{


 

  let params = req.params.torrentRedirect
  let req_link = changeLink.slashREDIRECT(params,"^","/")

  console.log(req_link,"req_link")

  const html = await got(req_link);
  const $ = cheerio.load(html.body);






let magnet =  $('.box-info li a').attr('href');





res.status(301).redirect(magnet)



}catch(error){

}


})







module.exports = router;
