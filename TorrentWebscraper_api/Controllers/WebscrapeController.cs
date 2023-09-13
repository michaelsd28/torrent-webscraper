using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TorrentWebscraper_api.Interfaces;
using TorrentWebscraper_api.Repository;

namespace TorrentWebscraper_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebscrapeController : ControllerBase
    {

      

        // GET: WebscrapeController
        [HttpGet("/get-top-torrents/category={category}")]
        public async Task<ActionResult> GetTopTable(string category)
        {
            var result = new WebscraperRepository();
            var list = await result.GetTopTorrents("");
            return Ok(list);
     
        }

     


    }
}
