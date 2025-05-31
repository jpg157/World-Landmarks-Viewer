using landmark_backend_api.Services.LandmarkService;
using landmark_backend_api.Data.ExternalAPIs.Config;
using landmark_backend_api.Data.ExternalAPIs;
using dotenv.net;
using landmark_backend_api.Endpoints;
using landmark_backend_api.Src.Constants;
using Microsoft.AspNetCore.Authentication.JwtBearer;

// asp .net core app config - using minimal api
// launches a host responsible for:
// - starting the application
// - configuring http server, 
// - setting up the http pipeline, and routes for processing requests and responses

// Load env variables
DotEnv.Load();

// web application builder - provides apis for configuring the application host and http pipeline
var builder = WebApplication.CreateBuilder(args);

// auth middleware
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme);
  
builder.Services.AddAuthorization();

// register required shared services in services DI container:
builder.Services.AddScoped<ILandmarkService, LandmarkService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddSingleton<ILandmarkDataAccessor, LandmarkRepository>(); //TODO: change this to scoped service once db implemented
builder.Services.AddScoped<IImageDataAccessor, CloudinaryImageApi>();

// anti-forgery middleware to prevent cross-site request forgery
builder.Services.AddAntiforgery(options =>
{
  options.HeaderName = AntiforgeryToken.XSRF_TOKEN_NAME;
});

// Cloudinary
string? cloudinaryUrl = builder.Configuration["CLOUDINARY_URL"];
var cloudinary = CloudinaryConfig.CreateCloudinary(cloudinaryUrl);
builder.Services.AddSingleton(cloudinary);

// create web application instance (an application host)
// configures req/res pipeline and route handlers in application
var app = builder.Build();

// ===== Middleware ======

// app.Use((context, next) =>
// {
//   context.Request.
//   return next(context);
// });

app.UseAntiforgery(); // anti-forgery middleware
app.UseAuthentication(); // authentication
app.UseAuthorization(); // authorization

// ====== Map Endpoints ======

app.MapGet("/", () => "Hello World!");

//=========
// Auth
//=========
app.RegisterAuthEndpoints();

// ========
// Landmarks
// ========
app.RegisterLandmarkEndpoints();

// ========
// Antiforgery
// ========
app.RegisterAntiforgeryEndpoints();

// web app instance run method
// starts http server and initiates http request processing pipeline
app.Run();
