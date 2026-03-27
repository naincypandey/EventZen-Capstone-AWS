var builder = WebApplication.CreateBuilder(args);

// Force listening on port 5059 for AWS/Docker
builder.WebHost.UseUrls("http://*:5059");

//  ADDED: Register Swagger Services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddControllers();

var app = builder.Build();

// ✅ ADDED: Enable Swagger Middleware (Outside the 'if' block so it works on AWS)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Venue API V1");
    c.RoutePrefix = "swagger"; // Swagger will be at http://IP:5059/swagger
});

app.UseCors("AllowAll"); 
app.UseAuthorization();
app.MapControllers();
app.Run();