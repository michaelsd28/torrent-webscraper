using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using TorrentWebscrape_blazor;
using MudBlazor.Services;
using Torrent_Webscrape_blazor.Model;
using Blazored.LocalStorage;




var builder = WebAssemblyHostBuilder.CreateDefault(args);


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin();  //set the allowed origin
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            policy.DisallowCredentials();
            policy.Build();

        });
});

builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");



builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddMudServices();
builder.Services.AddSingleton<StateContainer>();


builder.Services.AddBlazoredLocalStorage();
await builder.Build().RunAsync();

