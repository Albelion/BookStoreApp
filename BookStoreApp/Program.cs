using Microsoft.EntityFrameworkCore;
using BookStoreApp.Data.Models;
using BookStoreApp.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Builder;

namespace BookStoreApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers().AddNewtonsoftJson(option=>option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            builder.Services.AddDbContext<BookStoreDbContext>(opts=>{
                opts.UseSqlServer(builder.Configuration["ConnectionStrings:BookStoreConnection"]);
            });

            builder.Services.AddCors(option=>option.AddPolicy("CorsPolicy", corsBuilder=>
                corsBuilder.AllowAnyMethod().AllowAnyHeader().WithOrigins(builder.Configuration["Frontend"])));
            builder.Services.AddScoped<IStoreRepository, BookStoreRepository>();
            builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();


            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();
            app.UseStaticFiles(new StaticFileOptions{
                FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Images")),
                RequestPath = "/Images"
            });
            
            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints=>{
                endpoints.MapControllers();
            });
            // app.MapControllerRoute(
            //     name: "default",
            //     pattern: "{controller}/{action=Index}/{id?}");

            // app.MapFallbackToFile("index.html");
            SeedData.EnsureSeed(app);
            

            app.Run();
        }
    }
}