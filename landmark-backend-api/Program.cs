using landmark_backend_api.Services.LandmarkService;
using landmark_backend_api.Data.ExternalApis.Config;
using landmark_backend_api.Data.ExternalApis;
using landmark_backend_api.Endpoints;
using landmark_backend_api.Src.Constants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using landmark_backend_api.Data.Repositories;
using landmark_backend_api.Data.Repositories.Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using landmark_backend_api;
using System.Security.Claims;
using landmark_backend_api.Middleware.Auth.SetupUtils;
using Microsoft.AspNetCore.Authorization;
using landmark_backend_api.Middleware.Auth;
using landmark_backend_api.Validators;
using FluentValidation;

// asp .net core app config - using minimal api
// launches a host responsible for:
// - starting the application
// - configuring http server, 
// - setting up the http pipeline, and routes for processing requests and responses

EnvConfig.LoadEnv();

// web application builder - provides apis for configuring the application host and http pipeline
var builder = WebApplication.CreateBuilder(args);

// ====== Configure and Add Database Context Instance ======

string? dbConnectionString = builder.Configuration.GetConnectionString("Default")?
                                                  .Replace("${POSTGRESS_PASSWORD}", builder.Configuration["POSTGRESS_PASSWORD"]);

builder.Services.AddDbContext<AppDbContext>(options =>
  options.UseNpgsql(dbConnectionString)
);

// ====== Auth Config and DI ======

string AUTH_SERVER_DOMAIN = $"https://{builder.Configuration["Auth0:Domain"]}/";

// register jwt scheme with bearer configuration for authentication
builder.Services
  .AddAuthentication(
    JwtBearerDefaults.AuthenticationScheme // set jwt bearer as the default scheme (any consumer app bearing a valid token in req header to be authorized to access the protected endpoints)
  )
  .AddJwtBearer(options => // configuration for jwt bearer
  {
    // options.SaveToken = false; // do not store token on server after initial created (on authentication success)

    // Set the auth server domain
    // Sets the domain to of the auth0 JKWS (JSON key web sets) endpoint for fetching the public key
    options.Authority = AUTH_SERVER_DOMAIN;

    // Set the domain of the protected resources (should be the identifier of this api registered in auth0)
    // - Needed to be able to make public key http request so the auth0 server can verify the intended audience with the 
    // audience in the client-sent access token
    options.Audience = builder.Configuration["Auth0:Audience"];

    // configure how the jwt token should be validated during authentication
    options.TokenValidationParameters = new TokenValidationParameters
    {
      // ValidateIssuerSigningKey = true, // validate the token signature (will use the built-in default signature validation)
      NameClaimType = ClaimTypes.NameIdentifier
    };
  });

builder.Services.AddAuthorization(options =>
{
  // Add the policies that endpoints can set as requirements to access (using permissions, which are evaluated during authorization process)
  options.AddAuthorizationPolicy(AuthPolicyPermissions.CREATE_LANDMARKS, AUTH_SERVER_DOMAIN);
  options.AddAuthorizationPolicy(AuthPolicyPermissions.UPDATE_OWN_LANDMARKS, AUTH_SERVER_DOMAIN);
  options.AddAuthorizationPolicy(AuthPolicyPermissions.UPDATE_ALL_LANDMARKS, AUTH_SERVER_DOMAIN);
  options.AddAuthorizationPolicy(AuthPolicyPermissions.DELETE_LANDMARKS, AUTH_SERVER_DOMAIN);
  options.AddAuthorizationPolicy(AuthPolicyPermissions.READ_NEW_ANTIFORGERY, AUTH_SERVER_DOMAIN);
});

// Add authorization handler to compare and evaluate "permissions" claim in access token with the required permission(s)
builder.Services.AddSingleton<IAuthorizationHandler, HasPermissionHandler>();

// Anti-forgery middleware to prevent CSRF on post/put/patch/delete requests
builder.Services.AddAntiforgery(options =>
{
  options.HeaderName = AntiforgeryToken.XSRF_TOKEN_NAME;
});

// ====== Validation Services DI ======
builder.Services.AddValidatorsFromAssemblyContaining<LandmarkReqDtoValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<LandmarkImageFileValidator>();

// Add scoped so the serviceProvider service can resolve / produce 
// different validator implementations based on the dto type
builder.Services.AddScoped<IReqDtoValidator, ReqDtoValidator>();

// ====== Resource Services DI ======

// register required shared services in services DI container:
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<ILandmarkService, LandmarkService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<ILandmarkDataAccessor, LandmarkRepository>(); //TODO: change this to scoped service once db implemented
builder.Services.AddScoped<IImageDataAccessor, CloudinaryImageApi>();

// Cloudinary singleton instance used in CloudinaryImageApi service
string? cloudinaryUrl = builder.Configuration["CLOUDINARY_URL"];
var cloudinary = CloudinaryConfig.CreateCloudinary(cloudinaryUrl);
builder.Services.AddSingleton(cloudinary);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// create web application instance (an application host)
// configures req/res pipeline and route handlers in application
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

// ===== Middleware ======

// Only allow http requests from the frontend server (or localhost in development)
app.UseHostFiltering();

// Authentiation middleware is required to run before antiforgery 
// -  UseAntiforgery() relies on HttpContext.User claims principle to validate the 
//    antiforgery token against the resulting user (user is returned after verifying the access token)
app.UseAuthentication(); // authentication
app.UseAntiforgery(); // anti-forgery - validates antiforgery token against the user in httpcontext
app.UseAuthorization(); // authorization

// ====== Map Endpoints ======

// Swagger
app.MapSwagger().RequireAuthorization();

app.MapGet("/", () => "Hello World!").WithTags("Root"); // TO REMOVE

// ========
// Landmarks
// ========
app.MapLandmarkEndpoints();

// ========
// Antiforgery
// ========
app.MapAntiforgeryEndpoints();

// web app instance run method
// starts http server and initiates http request processing pipeline
app.Run();
