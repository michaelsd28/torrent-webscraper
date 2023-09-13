using AngleSharp.Dom;
using AngleSharp;
using TorrentWebscraper_api.Interfaces;
using TorrentWebscraper_api.Models;
using MongoDB.Bson;

namespace TorrentWebscraper_api.Repository
{
    public class WebscraperRepository : IWebscraperRepository
    {
        public async Task<List<TopTorrent>> GetTopTorrents(string category)
        {
            return await GetTVShowsList();
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
            var magnetList = rawMagnetList.Select(x => x.GetAttribute("href"));

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


        public static async Task<IHtmlCollection<IElement>> TopTorrentScraper(string QuerySelector, string url)
        {
            var httpClient = new HttpClient();

      

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
                var current = new TopTorrent(x + 1, nameList.ElementAt(x), magnetList.ElementAt(x)!, "nyaa");

                list.Add(current);
            }

            return list;
        }
    }
}
