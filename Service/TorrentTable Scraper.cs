using AngleSharp;
using AngleSharp.Dom;
using Torrent_Webscrape_blazor.Model;

namespace TorrentWebscrape_blazor.Service
{
    public class TorrentTable_Scraper
    {

        public  async Task<IHtmlCollection<IElement>> ScrapeTorrent(string QuerySelector, string url)
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


        public async Task<List<TorrentTable>> PirateSearch(string SearchTerm)
        {
            var torrents = new List<TorrentTable>();


            string url = $"https://thepiratebay10.org/search/{SearchTerm}/1/99/0";

            //type
            string queryType = "#searchResult > tbody > tr:nth-child(n) > td.vertTh > center > a:nth-child(1)";
            var typeList = await ScrapeTorrent(queryType, url);

            //subtype
            string querySubType = "#searchResult > tbody > tr:nth-child(n) > td.vertTh > center > a:nth-child(3)";
            var subtypeList = await ScrapeTorrent(querySubType, url);

            //name
            string queryName = "#searchResult > tbody > tr:nth-child(n) > td:nth-child(2) > div > a";
            var nameList = await ScrapeTorrent(queryName, url);

            //magnet
            string queryMagnet = "#searchResult > tbody > tr:nth-child(n) > td:nth-child(2) > a:nth-child(2)";
            var magnetList = await ScrapeTorrent(queryMagnet, url);

            //size
            string querySize = "#searchResult > tbody > tr:nth-child(n) > td:nth-child(2) > font";
            var sizeList = await ScrapeTorrent(querySize, url);

            //seed
            string querySeed = "#searchResult > tbody > tr:nth-child(n) > td:nth-child(3)";
            var seedList = await ScrapeTorrent(querySeed, url);


            for (int x = 0; x < nameList.Length; x++) {

                var sizeNODETAILS  = await  new Helper(). GetPirateSize (sizeList[x].TextContent);

     

                var current = new TorrentTable(
                      typeList.ElementAt(x).TextContent,
                      subtypeList.ElementAt(x).TextContent,
                      nameList.ElementAt(x).TextContent,
                      magnetList.ElementAt(x).GetAttribute("href").ToString(),
                      sizeNODETAILS,
                      seedList.ElementAt(x).TextContent

                      );


                torrents.Add(current);



            }



            return torrents;

        }

        public async Task<List<TorrentTable>> AnimeSearch(string SearchTerm)
        {

            var torrents = new List<TorrentTable>();


            string url = $"https://nyaa.si/?f=0&c=0_0&q={SearchTerm}&s=seeders&o=desc";

            //type
            string queryType = "body > div.container > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(1) > a";
            var typeList = await ScrapeTorrent(queryType, url);

            //subtype
            string querySubType = "body > div.container > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(1) > a";
            var subtypeList = await ScrapeTorrent(querySubType, url);

            //name
            string queryName = "body > div.container > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(2) > a:not(.comments)";
            var nameList = await ScrapeTorrent(queryName, url);

            //magnet
            string queryMagnet = "body > div.container > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(3) > a:nth-child(2)";
            var magnetList = await ScrapeTorrent(queryMagnet, url);

            //size
            string querySize = "body > div.container > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(4)";
            var sizeList = await ScrapeTorrent(querySize, url);

            //seed
            string querySeed = "body > div.container > div.table-responsive > table > tbody > tr:nth-child(n) > td:nth-child(6)";
            var seedList = await ScrapeTorrent(querySeed, url);


            for (int x = 0; x < nameList.Length; x++)
            {

                var newType = typeList.ElementAt(x).GetAttribute("title").Replace("Anime - ","");

                var current = new TorrentTable(
              "Anime",
                 newType,
                    nameList.ElementAt(x).TextContent,
                    magnetList.ElementAt(x).GetAttribute("href").ToString(),
                   "💾 " + sizeList.ElementAt(x).TextContent,
                    seedList.ElementAt(x).TextContent

                    );


                torrents.Add(current);



            }


            return torrents;
        }

        public async Task<List<TorrentTable>> _1377xSearch(string SearchTerm)
        {
            var torrents = new List<TorrentTable>();



            string url = $"https://1337x.to/sort-search/{SearchTerm}/seeders/desc/1/";

            //type
            string queryType = "body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr:nth-child(n) > td.coll-5 > a";
            var typeList = await ScrapeTorrent(queryType, url);

            //subtype
            string querySubType = "body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr:nth-child(n) > td.coll-5 > a";
            var subtypeList = await ScrapeTorrent(querySubType, url);

            //name
            string queryName = "body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr:nth-child(n) > td.coll-1.name > a:nth-child(2)";
            var nameList = await ScrapeTorrent(queryName, url);

            //magnet
            string queryMagnet = "body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr:nth-child(n) > td.coll-1.name > a:nth-child(2)";
            var magnetList = await ScrapeTorrent(queryMagnet, url);

            //size
            string querySize = "body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr:nth-child(n) > td.coll-4";
            var sizeList = await ScrapeTorrent(querySize, url);

            //seed
            string querySeed = "body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr:nth-child(n) > td.coll-2.seeds";
            var seedList = await ScrapeTorrent(querySeed, url);


            for (int x = 0; x < nameList.Length; x++)
            {
                int sizeStartIndex = sizeList.ElementAt(x).InnerHtml.IndexOf("<");
                int sizeEndIndex = sizeList.ElementAt(x).InnerHtml.Length - sizeStartIndex;
                var size = sizeList.ElementAt(x).InnerHtml.Remove(sizeStartIndex, sizeEndIndex);


                var current = new TorrentTable(
                "1337x",
                      subtypeList.ElementAt(x).TextContent,
                    nameList.ElementAt(x).TextContent,
                    magnetList.ElementAt(x).GetAttribute("href").ToString(),
                    size,
                    seedList.ElementAt(x).TextContent

                    );

                torrents.Add(current);

            }


            return torrents;
        }


        
        

            public async Task<List<TorrentTable>> GetTorrentList(string WhereSearch, string SearchTerm) {

            var torrents = new List<TorrentTable>();


            switch (WhereSearch) {

                case "pirate-search":
                    torrents = await PirateSearch(SearchTerm);
                    break;
                case "nyaa-search":
                    torrents = await AnimeSearch(SearchTerm);
                    break;
                case "1337x-search":
                    torrents = await _1377xSearch(SearchTerm);
                    break;

                default:
                    torrents = new List<TorrentTable>() { new TorrentTable("null", "null", SearchTerm, "default", "000", "default ") };
                    break;
            }


            return torrents;
        }


 

        internal class Helper
        {


    

            public async Task<string> GetPirateSize(string size)
            {

                var FirstCommaIndex = size.IndexOf(", ");
                size = size.Remove(0, FirstCommaIndex+2);

                FirstCommaIndex = size.IndexOf(", ");
                size = size.Remove(FirstCommaIndex );


                size = size.Replace("Size", "💾");

                return size;


            }


        }
    }
}
