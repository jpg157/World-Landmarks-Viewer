using landmark_backend_api.Endpoints.LandmarksView;
using landmark_backend_api.Services.LandmarkService;

// asp .net core app config - using minimal api
// launches a host responsible for:
// - starting the application
// - configuring http server, 
// - setting up the http pipeline, and routes for processing requests and responses

// web application builder - provides apis for configuring the application host and http pipeline

var builder = WebApplication.CreateBuilder(args);

// register required shared services in services DI container
builder.Services.AddSingleton<ILandmarkService, LandmarkService>();

// create web application instance (an application host)
// configures req/res pipeline and route handlers in application
var app = builder.Build();

// ====== Map Endpoints ======

// ========
// Landmarks
// ========
app.RegisterLandmarkEndpoints();

// web app instance run method
// starts http server and initiates http request processing pipeline
app.Run();
