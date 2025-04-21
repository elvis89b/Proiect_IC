using Backend.BusinessLogic.Services;
using Backend.ControllerLogic.ModelsDTOs;
using Microsoft.AspNetCore.Authorization;
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
        Console.WriteLine($"[ChatController] userId header = {userId}");
        string aiReply = await CallPython(conv);
        Console.WriteLine($"[ChatController] aiReply = «{aiReply}»");

        if (aiReply.TrimStart().StartsWith("{\"tool\""))
        {
            var call = JsonSerializer.Deserialize<ToolCall>(
                aiReply,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }
            )!;

            if (call.Tool == "addRecipeToPlanner")
            {
                Console.WriteLine("→ Entered addRecipeToPlanner branch");
                Console.WriteLine($"   name={call.Args.Name}, desc={call.Args.Description}, day={call.Args.Day}");

                int recipeId = _plannerSvc.InsertRecipeIfNew(
                                   call.Args.Name,
                                   call.Args.Description);
                Console.WriteLine($"   InsertRecipeIfNew returned recipeId={recipeId}");

                _plannerSvc.AddToPlanner(userId, recipeId, call.Args.Day);
                Console.WriteLine("   AddToPlanner done");

                var confirm = $"Done! Added “{call.Args.Name}” for {call.Args.Day}.";
                Console.WriteLine($"   Returning confirm: {confirm}");
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