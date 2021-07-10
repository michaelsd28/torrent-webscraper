const express = require("express");
const cheerio = require("cheerio");
const router = express.Router();
const top_games_url = "https://1337x.to/top-100-games";
const cron = require("node-cron");
const fs = require("fs");
const got = require("got");
const date = new Date();
const changeLink = require("../Search-sites/search link request");
const localhostRED = "http://localhost:3001/1337x/redirect/"

//cron.scheduleJob("* * * * *", async () => {
//cron.scheduleJob(" 0 1 * * *", async () => {
  cron.scheduleJob(" 0 1 * * *", async () => {
  const html = await got(top_games_url);

  const $ = cheerio.load(html.body);

  let top_Titles = [];
  $( "body > main > div > div > div.featured-list > div > table > tbody > tr:nth-child(n) > td.coll-1.name > a:nth-child(2)").each((index, value) => {
    let link = $(value).text();
    top_Titles.push(link);
  });

  let top_seeds = [];
  $(
    "body > main > div > div > div.featured-list > div > table > tbody > tr:nth-child(n) > td.coll-2.seeds"
  ).each((index, value) => {
    let link = $(value).text();

    top_seeds.push(link);
  });

  let top_link = [];
  $(
    "body > main > div > div > div.featured-list > div > table > tbody > tr:nth-child(n) > td.coll-1.name > a:nth-child(2)"
  ).each((index, value) => {
    let link = localhostRED +  changeLink.slashFAKE ("https://1337x.to" + `${$(value).attr("href")}`);

    top_link.push(  link);
  });





  const JsonResponse = {
    games: top_Titles,
    magnet: top_link,
    seeds: top_seeds,
  };

  fs.writeFileSync(
    __dirname + "/z_Top Games.json",
    JSON.stringify(JsonResponse),
    (err) => {
      if (err) throw err;
    }
  );
console.log(`top games* file updated on ${date}`)
 
});


//   export async function  writeTopGames () {
//   const html = await got(top_games_url);

//   const $ = cheerio.load(html.body);

//   let top_Titles = [];
//   $( "body > main > div > div > div.featured-list > div > table > tbody > tr:nth-child(n) > td.coll-1.name > a:nth-child(2)").each((index, value) => {
//     let link = $(value).text();
//     top_Titles.push(link);
//   });

//   let top_seeds = [];
//   $(
//     "body > main > div > div > div.featured-list > div > table > tbody > tr:nth-child(n) > td.coll-2.seeds"
//   ).each((index, value) => {
//     let link = $(value).text();

//     top_seeds.push(link);
//   });

//   let top_link = [];
//   $(
//     "body > main > div > div > div.featured-list > div > table > tbody > tr:nth-child(n) > td.coll-1.name > a:nth-child(2)"
//   ).each((index, value) => {
//     let link = localhostRED +  changeLink.slashFAKE ("https://1337x.to" + `${$(value).attr("href")}`);

//     top_link.push(  link);

//   });





//   const JsonResponse = {
//     games: top_Titles,
//     magnet: top_link,
//     seeds: top_seeds,
//   };

//   fs.writeFileSync(
//     __dirname + "/z_Top Games.json",
//     JSON.stringify(JsonResponse),
//     (err) => {
//       if (err) throw err;
//     }
//   );
// console.log(`file updated on ${date}`)
 
//   }








router.get("/", async (req, res) => {
  res.sendFile(__dirname + "/z_Top Games.json");
  
  console.log("sent file /z_Top Games.json")
});


module.exports = router;