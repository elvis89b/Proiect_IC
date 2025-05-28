using Backend.BusinessLogic.Services;
using Backend.ControllerLogic.ModelsDTOs;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace Backend.ControllerLogic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IHttpClientFactory _http;
        private readonly PlannerService _plannerSvc;

        public ChatController(IHttpClientFactory http, PlannerService svc)
        {
            _http = http;
            _plannerSvc = svc;
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] List<ChatMessageModel> conv,
            [FromHeader(Name = "X-User-Id")] int userId)
        {
            string aiReply = await CallPython(conv);

            if (aiReply.TrimStart().StartsWith("{\"tool\""))
            {
                var call = JsonSerializer.Deserialize<ToolCall>(
                    aiReply,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                )!;

                if (call.Tool == "addRecipeToPlanner")
                {
                    int recipeId = await _plannerSvc.InsertRecipeIfNewAsync(
                        call.Args.Name,
                        call.Args.Description);

                    await _plannerSvc.AddToPlannerAsync(userId, recipeId, call.Args.Day);

                    var confirm = $"Done! Added “{call.Args.Name}” for {call.Args.Day}.";
                    return Ok(new { reply = confirm });
                }
            }

            return Ok(new { reply = aiReply });
        }

        private async Task<string> CallPython(object payload)
        {
            var http = _http.CreateClient();
            var body = JsonSerializer.Serialize(payload);
            var resp = await http.PostAsync(
                "http://localhost:5005/chat",
                new StringContent(body, Encoding.UTF8, "application/json"));
            var json = await resp.Content.ReadAsStringAsync();
            return JsonDocument.Parse(json).RootElement.GetProperty("reply").GetString()!;
        }

        record ToolCall(string Tool, ArgsClass Args);
        record ArgsClass(string Name, string Description, string Day);
    }
}
