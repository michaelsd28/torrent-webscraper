
using System.Text.Json;
using System.Text.Json.Serialization;
using Torrent_Webscrape_blazor.Model;

namespace TorrentWebscrape_blazor.Model
{
    public class TopTorrentList
    {


        public string Type { get; set; }

        public string Name { get; set; }

        public List<TopTorrent> TopTorrents { get; set; }

        public TopTorrentList(string type, string name, List<TopTorrent> topTorrents)
        {
            Type = type;
            Name = name;
            TopTorrents = topTorrents;
        }



       public string GetList_String() {

            string myList = JsonSerializer.Serialize(TopTorrents);


            return myList;
        }
    }
}
