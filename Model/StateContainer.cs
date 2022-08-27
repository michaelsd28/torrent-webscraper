namespace Torrent_Webscrape_blazor.Model
{
    public class StateContainer
    {


        private string? InputValue;

        public string InputValueProperty
        {
            get => InputValue ?? string.Empty;
            set
            {
                InputValue = value;
                NotifyStateChanged();
            }
        }



        private string[]? SuggestionList;

        public string [] SuggestionListProperty
        {
            get => SuggestionList ?? new string[0];
            set
            {
                SuggestionList = value;
                NotifyStateChanged();
            }
        }

              private IEnumerable<TorrentTable> TorrentTableList;

        public IEnumerable<TorrentTable> TorrentTableListProperty
        {
            get => TorrentTableList ??new List<TorrentTable>();
            set
            {
                TorrentTableList = value;
                NotifyStateChanged();
            }
        }


        private bool? LoadingState;

        public bool LoadingStateProperty
        {
            get => LoadingState ?? false;
            set
            {
                LoadingState = value;
                NotifyStateChanged();
            }
        }





        public event Action? OnChange;

        private void NotifyStateChanged() => OnChange?.Invoke();
    }
}