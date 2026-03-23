var builder = WebApplication.CreateBuilder(args);

// Force listening on port 5059 for AWS/Docker
builder.WebHost.UseUrls("http://*:5059");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddControllers();

var app = builder.Build();
app.UseCors("AllowAll"); 
app.UseAuthorization();
app.MapControllers();
app.Run();