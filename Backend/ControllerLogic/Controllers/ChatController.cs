using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Backend.ControllerLogic.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IHttpClientFactory _http;

    public ChatController(IHttpClientFactory http) => _http = http;

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] object payloadFromReact)
    {
        //microservice Python
        var httpClient = _http.CreateClient();
        var content = new StringContent(
                            JsonSerializer.Serialize(payloadFromReact),
                            Encoding.UTF8,
                            "application/json");

        var resp = await httpClient.PostAsync("http://localhost:5005/chat", content);
        var body = await resp.Content.ReadAsStringAsync();

        return Content(body, "application/json");
    }
}
