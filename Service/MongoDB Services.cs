using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.Json;
using Torrent_Webscrape_blazor.Model;
using TorrentWebscrape_blazor.Model;
using System.Text;

namespace TorrentWebscrape_blazor.Service
{        /// <summary>
         /// mongo db key:: 9aY8OhiKc6e6s0cjskh78GZS6IeoHsUEeCqVk7yUlsL9XySWsuWaeBCgTUlV1sgO
         /// </summary>
    public class MongoDB_Services
    {

        /*
var settings = MongoClientSettings.FromConnectionString("mongodb://michaelsd28:<password>@cluster0-shard-00-00.cneai.mongodb.net:27017,cluster0-shard-00-01.cneai.mongodb.net:27017,cluster0-shard-00-02.cneai.mongodb.net:27017/?ssl=true&replicaSet=atlas-x7tzqc-shard-0&authSource=admin&retryWrites=true&w=majority");
var client = new MongoClient(settings);
var database = client.GetDatabase("test");
*/
        string connectionString = "mongodb://michaelsd28:mypassword28@cluster0-shard-00-00.cneai.mongodb.net:27017,cluster0-shard-00-01.cneai.mongodb.net:27017,cluster0-shard-00-02.cneai.mongodb.net:27017/?ssl=true&replicaSet=atlas-x7tzqc-shard-0&authSource=admin&retryWrites=true&w=majority";
        public async Task InsertTopTorrent(TopTorrentList topTorrents)
        {



            /// new document 
            BsonDocument.TryParse(topTorrents.ToJson(), out BsonDocument replacement);



            var client = new HttpClient();
            var request = new HttpRequestMessage();
            request.RequestUri = new Uri("https://data.mongodb-api.com/app/data-ocnfu/endpoint/data/beta/action/insertOne");
            request.Method = HttpMethod.Post;
            request.Headers.Add("Access-Control-Request-Headers", "*");
            request.Headers.Add("api-key", "9aY8OhiKc6e6s0cjskh78GZS6IeoHsUEeCqVk7yUlsL9XySWsuWaeBCgTUlV1sgO");
            request.Headers.Add("Accept", "application/json");

            var bodyString = @"{  ""dataSource"": ""Cluster0"",  ""database"": ""TorrentWebscrapeDB"",  ""collection"": ""Top torrent"",  ""document"": "+replacement.ToJson()+"}";
            var content = new StringContent(bodyString, Encoding.UTF8, "application/json");
            request.Content = content;

            var response = await client.SendAsync(request);
            var result = await response.Content.ReadAsStringAsync();
         

        }


       public async Task UpdateTopTorrent(TopTorrentList topTorrents)
        {



            /// new document 
            BsonDocument.TryParse(topTorrents.ToJson(), out BsonDocument replacement);




            //filter to find old document
            var filter = new BsonDocument() {
        new BsonElement("type", topTorrents.Type)
      };

            var client = new HttpClient();
            var request = new HttpRequestMessage();
            request.RequestUri = new Uri("https://data.mongodb-api.com/app/data-ocnfu/endpoint/data/beta/action/updateOne");
            request.Method = HttpMethod.Post;
            request.Headers.Add("Access-Control-Request-Headers", "*");
            request.Headers.Add("api-key", "9aY8OhiKc6e6s0cjskh78GZS6IeoHsUEeCqVk7yUlsL9XySWsuWaeBCgTUlV1sgO");
            request.Headers.Add("Accept", "application/json");

            var bodyString = @"{  ""dataSource"": ""Cluster0"",  ""database"": ""TorrentWebscrapeDB"",  ""collection"": ""Top torrent"", ""filter"": "+ filter.ToJson()+ @", ""update"": { ""$set"": " + replacement.ToJson() + "}";
            var content = new StringContent(bodyString, Encoding.UTF8, "application/json");
            request.Content = content;

            var response = await client.SendAsync(request);
            var result = await response.Content.ReadAsStringAsync();
      

        }


        public async Task<List<TopTorrent>> GetTopTorrent(string typeTorrent)
        {



            //filter to find old document
            var filter = new BsonDocument() {
        new BsonElement("Type", typeTorrent)
      };

            var client = new HttpClient();
            var request = new HttpRequestMessage();
            request.RequestUri = new Uri("https://data.mongodb-api.com/app/data-ocnfu/endpoint/data/beta/action/findOne");
            request.Method = HttpMethod.Post;
            request.Headers.Add("Access-Control-Request-Headers", "*");
            request.Headers.Add("api-key", "9aY8OhiKc6e6s0cjskh78GZS6IeoHsUEeCqVk7yUlsL9XySWsuWaeBCgTUlV1sgO");
            request.Headers.Add("Accept", "application/json");

        

            var bodyString = @"{  ""dataSource"": ""Cluster0"",  ""database"": ""TorrentWebscrapeDB"",  ""collection"": ""Top torrent"", ""filter"": " + filter.ToJson()  + "}";
            var content = new StringContent(bodyString, Encoding.UTF8, "application/json");
            request.Content = content;

            var response = await client.SendAsync(request);
            var documentResponse = await response.Content.ReadAsStringAsync();
            var bsonResponse = BsonDocument.Parse(documentResponse)["document"];
      


        var topTorrentList  = JsonSerializer.Deserialize<TopTorrentList>(bsonResponse.ToJson());


            return topTorrentList.TopTorrents;
        }



        public async Task UpdateAllTorrentList()
        {
            //get all lists

       //     var animeList = await new TopTorrent_Scraper().GetAnimeList();
     //     var movieList = await new TopTorrent_Scraper().GetMoviesList();
        //   var tvshowList = await new TopTorrent_Scraper().GetTVShowsList();
        var gameList = await new TopTorrent_Scraper().GetGamesList();



            ///create object to save
    //     TopTorrentList topAnimeList = new TopTorrentList("AnimeList", "Nyaa list", animeList);
  //    TopTorrentList topMovieList = new TopTorrentList("MovieList", "Pirate movie list", movieList);
       //    TopTorrentList topTvshowList = new TopTorrentList("TVShowsList", "Pirate TVshow list", tvshowList);
            TopTorrentList topGameList = new TopTorrentList("GamesList", "Nyaa list", gameList);

            ///save in collection
     //  await InsertTopTorrent(topAnimeList);
      //    await InsertTopTorrent(topMovieList);
        //  await InsertTopTorrent(topTvshowList);
        await InsertTopTorrent(topGameList);

        }

 
        internal class Helper
        {

            string connectionString = "mongodb+srv://michaelsd28:mypassword28@cluster0.cneai.mongodb.net/TorrentWebscrapeDB?authSource=admin&replicaSet=atlas-x7tzqc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

            public IMongoCollection<BsonDocument> GetCollection()
            {

                // Create a MongoClient object by using the connection string
                var client = new MongoClient(connectionString);

                //Use the MongoClient to access the server
                var database = client.GetDatabase("TorrentWebscrapeDB");

                //get mongodb collection
                var collection = database.GetCollection<BsonDocument>("Top torrent");

                return collection;
            }

        }
    }
}