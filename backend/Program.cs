using backend.Data;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Register DB context 
builder.Services.AddDbContext<ProductDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnectionStrings")));

// Register Repository Layer
builder.Services.AddScoped<IProductRepository, SqlProductRepository>();
builder.Services.AddScoped<IInventoryOperationRepository, SqlInventoryOperationRepository>();

// CORS setting 
builder.Services.AddCors(options =>
{
    // For development
    options.AddPolicy("Development", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Development");

app.UseAuthorization();

app.MapControllers();

app.Run();
