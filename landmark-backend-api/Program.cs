using landmark_backend_api.WebAPI.Endpoints.LandmarksView;
using landmark_backend_api.WebAPI.Endpoints.Images;
using landmark_backend_api.Services.LandmarkService;
using landmark_backend_api.Services.ImageFileService;
using landmark_backend_api.Infrastructure.Config;

// asp .net core app config - using minimal api
// launches a host responsible for:
// - starting the application
// - configuring http server, 
// - setting up the http pipeline, and routes for processing requests and responses

// web application builder - provides apis for configuring the application host and http pipeline

var builder = WebApplication.CreateBuilder(args);

// register required shared services in services DI container:
builder.Services.AddSingleton<ILandmarkService, LandmarkService>(); //todo: changed to AddScoped
builder.Services.AddSingleton<ImageFileService>();

// Cloudinary
string? cloudinaryUrl = builder.Configuration["CLOUDINARY_URL"];
var cloudinary = CloudinaryConfig.CreateCloudinary(cloudinaryUrl);
builder.Services.AddSingleton(cloudinary);

// create web application instance (an application host)
// configures req/res pipeline and route handlers in application
var app = builder.Build();

// ====== Map Endpoints ======

// ========
// Landmarks
// ========
app.RegisterLandmarkEndpoints();

// ========
// Images
// ========
app.RegisterImageEndpoints();

// web app instance run method
// starts http server and initiates http request processing pipeline
app.Run();
