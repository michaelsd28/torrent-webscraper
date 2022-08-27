namespace Torrent_Webscrape_blazor.Model
{
    public class TopTorrent
    {
        public int Index { get; set; } 
        public string Name { get; set; } 
        public string Magnet { get; set; }

        public string Type { get; set; }

        public TopTorrent(int index, string name, string magnet, string type)
        {
            Index = index;
            Name = name;
            Magnet = magnet;
            Type = type;
        }
    }
}
