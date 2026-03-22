var builder = WebApplication.CreateBuilder(args);

// 1. Add CORS Policy (This must be BEFORE builder.Build())
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddControllers();

var app = builder.Build();

// 2. Use CORS (This must be BEFORE MapControllers)
app.UseCors("AllowAll"); 

app.UseAuthorization();

app.MapControllers();

app.Run();