const express = require('express')
const cheerio = require("cheerio")
const request = require("request")
const cron = require('node-cron');
const app = express();
const cors = require('cors')



app.use(cors())
const top_movies = require("./Top torrent/Top movies");
const top_shows = require("./Top torrent/Top Shows");
const top_anime = require("./Top torrent/Top anime");




app.use("/top-movies",top_movies)
app.use("/top-shows",top_shows)
app.use("/top-anime",top_anime)








// const mDate = new  Date();
// cron.schedule('* * * * *', () => {
//     console.log('running a task every minute',mDate);
//   });


app.get('/', (request,response) => {



    

    response.send('Hello world !!!')
})








app.listen(3001, () => {
    console.log(` server running on port -> http://localhost:3001`)
})