using TorrentWebscraper_api.Models;

namespace TorrentWebscraper_api.Interfaces
{
    public interface IWebscraperRepository
    {

        public Task<List<TopTorrent>> GetTopTorrents(string category); 
    }
}
