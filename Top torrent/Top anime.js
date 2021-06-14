const express = require("express");
const cheerio = require("cheerio");
const router = express.Router();
const top_anime_url = "https://nyaa.si/?s=seeders&o=desc";
const got = require('got');
const fs = require("fs");


//       fs.writeFile("Top Movies.json", topMOVIESfile, (err) => {
//         if (err) throw err;
//       });



router.get("/",  async (req, res) => {

    const html = await got(top_anime_url);
    const $ = cheerio.load(html.body);


      let top_Titles = [];
      $("tbody a").each((index, value) => {
        let link = $(value).text();

     if(link.includes(".mkv")){

        top_Titles.push(link);

     }

      });

      console.log(top_Titles,"top_Titles")




    
 
    


    


    //   fs.writeFile("Top Movies.json", topMOVIESfile, (err) => {
    //     if (err) throw err;
    //   });
    // }




  res.send("hi")




});


module.exports = router;