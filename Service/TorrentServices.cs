
using Blazored.LocalStorage;
using MongoDB.Bson;
using Torrent_Webscrape_blazor.Model;


namespace TorrentWebscrape_blazor.Service
{
    public class TorrentServices
    {

        public async Task<string> Get1337xMagnet(string link)
        {

            string querySelector = "body > main > div > div > div > div > div > ul> li:nth-child(1) > a";


            Console.WriteLine($"Get1337xMagnet::   {link}");
            var magnetLink = await new TorrentTable_Scraper().ScrapeTorrent(querySelector, link);




            return magnetLink.ElementAt(0).GetAttribute("href");
        }



        public async void SaveInput(StateContainer _StateContainer, ILocalStorageService localStorage) {

            try {

                ////  null check - if no key has been created
                if (await localStorage.GetItemAsync<List<string>>("_SuggestionList") == null) {
                    await localStorage.SetItemAsync<List<string>>("_SuggestionList", new List<string>());
                }

         

    

                
                var list = await localStorage.GetItemAsync<List<string>>("_SuggestionList");

                await localStorage.SetItemAsync<List<string>>("_SuggestionList", list);




                Console.WriteLine("SaveInput:: " + list.ToJson());


            bool hasItem = list.Exists(x => x == _StateContainer.InputValueProperty);

            if (hasItem)
            {
                return;
            }

                if (_StateContainer.InputValueProperty != "") {
         
                    list.Add(_StateContainer.InputValueProperty);
                    await localStorage.SetItemAsync<List<string>>("_SuggestionList", list);
                    _StateContainer.SuggestionListProperty = await localStorage.GetItemAsync<string[]>("_SuggestionList");

                }


            }
            catch (Exception ex) {

                Console.WriteLine("SaveInput error" + ex);
            
            }

        }

    }
}
