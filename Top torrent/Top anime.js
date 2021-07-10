const express = require("express");
const cheerio = require("cheerio");
const router = express.Router();
const top_anime_url = "https://nyaa.si/?s=seeders&o=desc";
const got = require("got");
const cron = require('node-schedule');
const fs = require("fs");
const date = new Date();

//cron.scheduleJob("* * * * *", async () => {
//cron.scheduleJob(" 0 1 * * *", async () => {


  cron.scheduleJob(" 0 1 * * *", async () => {
  const html = await got(top_anime_url);
  const $ = cheerio.load(html.body);

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
  let top_magnet = [];
  $("tbody a").each((index, value) => {
    let link_m = $(value).attr("href");

    if (link_m.includes("magnet")) {
      top_magnet.push(link_m);
    }
  });

  let top_seeds = [];
  $(
    "body > div > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(6)"
  ).each((index, value) => {
    let link_s = $(value).text();

    top_seeds.push(link_s);
  });

  console.log(
    top_Titles.length,
    "top_Titles",
    top_magnet.length,
    "top_magnet",
    top_seeds.length,
    "top_seeds"
  );

  let JsonResponse = {
    anime: top_Titles,
    magnet: top_magnet,
    seeds: top_seeds,
  };

  const topAnimeFile = JSON.stringify(JsonResponse);

  fs.writeFileSync(__dirname + "/z_Top anime.json", topAnimeFile, (err) => {
    if (err) throw err;
  });



  console.log(`top anime file updated on ${date}`)
 
});

router.get("/", async (req, res) => {
  res.sendFile(__dirname + "/z_Top anime.json");

  console.log("sent file /z_Top anime.json");
});

module.exports = router;
