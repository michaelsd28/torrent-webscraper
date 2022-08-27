using AngleSharp.Io;
using TorrentWebscrape_blazor.Service;

namespace Torrent_Webscrape_blazor.Model
{
    public class TorrentTable
    {

        public string name { get; set; }
        public string type { get; set; }
        public string subtype { get; set; }
        public string magnet { get; set; }
        public string size { get; set; }
        public string seed { get; set; }

        public TorrentTable(string type, string subtype, string name, string magnet, string size, string seed)
        {
            this.type = type;
            this.subtype = subtype;
            this.name = name;
            this.magnet = magnet;
            this.size = size;
            this.seed = seed;
        }



        public async Task<string>  Get1337xMagnet() {


         string newMagnet = await   new TorrentServices().Get1337xMagnet(magnet);

            Console.WriteLine($"newMagnet:: {newMagnet}");

          

            return newMagnet;
        
        }


    }
}
