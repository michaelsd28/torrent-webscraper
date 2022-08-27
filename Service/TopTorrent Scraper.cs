using AngleSharp;
using AngleSharp.Dom;
using MongoDB.Bson;
using Torrent_Webscrape_blazor.Model;

namespace TorrentWebscrape_blazor.Service
{
    public class TopTorrent_Scraper
    {

        public static async Task<IHtmlCollection<IElement>> TopTorrentScraper(string QuerySelector, string url)
        {


            var httpClient = new HttpClient();


            httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Access-Control-Allow-Origin", "GET,PUT,POST,DELETE");
            httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Access-Control-Allow-Credentials", "true");
            httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Access-Control-Allow-Headers", "*");
            httpClient.DefaultRequestHeaders.TryAddWithoutValidation("mode", "no-cors");



            string bodyResponse = await httpClient.GetStringAsync(url);



            IBrowsingContext context = BrowsingContext.New(Configuration.Default);

            //Create a document from a virtual request / response pattern
            IDocument document = await context.OpenAsync(req => req.Content(bodyResponse));


            //Or directly with CSS selectors
            IHtmlCollection<IElement> blueListItemsCssSelector = document.QuerySelectorAll(QuerySelector);




            return blueListItemsCssSelector;
        }


            public async Task<List<TopTorrent>> GetAnimeList()
              {

                 string siteURL = "https://nyaa.si/?s=seeders&o=desc";


               // string siteURL = "http://127.0.0.1:5500/Browse%20__%20Nyaa.html";

                ///for name
                var nameQuery = "body > div.container > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(2) > a:nth-child(n):not(.comments)";

                //for magnet
                var magnetQuery = "body > div.container > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(3) > a:nth-child(2)";


                var rawNameList = await TopTorrentScraper(nameQuery, siteURL);
                var rawMagnetList = await TopTorrentScraper(magnetQuery, siteURL);





                var nameList = rawNameList.ToList().Select(x => x.TextContent);
                var magnetList = rawMagnetList.Select(x => x.GetAttribute("href"));


              





                  var list = new List<TopTorrent>();


                  for (int x = 0; x <= 25; x++)
                  {


                      var current = new TopTorrent(x + 1, nameList.ElementAt(x), magnetList.ElementAt(x), "nyaa");

                      list.Add(current);


                  }

                  return list;



              }
       
            public async Task<List<TopTorrent>> GetGamesList()
                  {

                 string siteURL = @"https://1337x.to/top-100-games";


          //    string siteURL = "http://127.0.0.1:5502/Top%20100%20Game%20Torrents%20This%20Month%20_%201337x.html";

               ///for name
               var nameQuery = "body > main > div > div > div.featured-list > div > table > tbody > tr:nth-child(n) > td.coll-1.name > a:nth-child(2)";

                //for magnet
                var magnetQuery = "body > main > div > div > div.featured-list > div > table > tbody > tr:nth-child(n) > td.coll-1.name > a:nth-child(2)";


                var rawNameList = await TopTorrentScraper(nameQuery, siteURL);
                var rawMagnetList = await TopTorrentScraper(magnetQuery, siteURL);


                var nameList = rawNameList.Select(x => x.TextContent);
                var magnetList = rawMagnetList.Select(x => x.GetAttribute("href")).ToList();

 

                var list = new List<TopTorrent>();

                      for (int x = 0; x <= 25; x++)
                      {


                          var current = new TopTorrent(x + 1, nameList.ElementAt(x),  magnetList.ElementAt(x),"1337x");

                  ///  Console.WriteLine("current:: " + current.ToJson());
                    list.Add(current);


                      }


                      return list;

                  }

            public async Task<List<TopTorrent>> GetTVShowsList()
            {

                     string siteURL = @"https://thepiratebay10.org/top/205";

              //  string siteURL = "http://127.0.0.1:5500/The%20Pirate%20Bay%20-%20The%20galaxy's%20most%20resilient%20bittorrent%20site.html";

                ///for name
                var nameQuery = "#searchResult > tbody > tr:nth-child(n) > td:nth-child(2) > div > a";


                //for magnet
                var magnetQuery = "#searchResult > tbody > tr:nth-child(n) > td:nth-child(2) > a:nth-child(2)";


                var rawNameList = await TopTorrentScraper(nameQuery, siteURL);
                var rawMagnetList = await TopTorrentScraper(magnetQuery, siteURL);
            

                var nameList = rawNameList.Select(x => x.TextContent);
                var magnetList = rawMagnetList.Select(x => x.GetAttribute("href") );




                var list = new List<TopTorrent>();

                for (int x = 0; x <= 25; x++)
                {

                    ///magnetList.ElementAt(x)
                    var current = new TopTorrent(x + 1, nameList.ElementAt(x), magnetList.ElementAt(x), "pirate");

                    Console.WriteLine("current:: " + current.ToJson());

                    list.Add(current);


                }


                return list;
            }

             public async Task<List<TopTorrent>> GetMoviesList()
                 {
             ///  string siteURL =  "http://127.0.0.1:5500/Video%20_%20Movies%20-%20TPB.html";
                   string siteURL = "https://thepiratebay10.org/browse/201/1/7/0";

                ///for name
                var nameQuery = "#searchResult > tbody > tr:nth-child(n) > td:nth-child(2) > div > a";


                //for magnet
                var magnetQuery = "#searchResult > tbody > tr:nth-child(n) > td:nth-child(2) > a:nth-child(2)";


                var rawNameList = await TopTorrentScraper(nameQuery, siteURL);
                var rawMagnetList = await TopTorrentScraper(magnetQuery, siteURL);


                var nameList = rawNameList.Select(x => x.TextContent);
                var magnetList = rawMagnetList.Select(x => x.GetAttribute("href"));

            


                var list = new List<TopTorrent>();

                     for (int x = 0; x <= 25; x++)
                     {

                         var current = new TopTorrent(x + 1, nameList.ElementAt(x), magnetList.ElementAt(x), "piratebay");


                         list.Add(current);


                     }


                     return list;
                 }

        
    
    
    }




        internal class Helper
        {




        }
    }
