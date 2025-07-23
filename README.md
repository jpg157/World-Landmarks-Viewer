# World-Landmarks-Viewer

A web application that allows users to discover and learn about landmarks from around the world.

Users can view landmark details to learn about their cultural and historical significance, and explore their locations on a map or in 3D view. They can also contribute by creating new landmarks.

## Features:

- Browse a curated list of world landmarks
- Search and filter landmarks by name, location, and category    *- not implemented yet*
- Save landmarks to view later    *- not implemented yet*
- Explore landmark locations in 3D view (Google street view)    *- not implemented yet*
- Users can create new landmarks, or update ones they created previously (crowdsource)
  - Can optionally have a landmark description be automatically generated for them    *- not implemented yet*
- Admin tools for moderating user contributions

## Implementation Details

- Pagination of landmarks - offset-based pagination    *- not implemented yet*
- Validation:
  - Checking if the landmark information describes an actual landmark, and that the image matches with the landmark name and description    *- not implemented yet*
  - Checking if the landmark being created already exists    *- not implemented yet*
- Auth: OIDC-based using Auth0 as external identity provider. Access tokens are obtained in the frontend app, and validated indirectly by the backend api.

## Tech Stack

- **Frontend:** React / Next.js / Typescript
- **Backend:** ASP.NET Core / C#
- **Database**: PostgreSQL
- **Image Storage and Validation**: Cloudinary
- **Auth**: Auth0
- **Validation**:
  - **Backend**: FluentValidation
  - **Frontend**: Zod

## Installation

*Currently the app will not work without the Auth0 client being configured using the .env and appsettings.json values.*
*This section and the example envs will be updated soon with the missing Auth0 variables.*

1. **Clone the repository**
   ```bash
   git clone https://github.com/jpg157/World-Landmarks-Viewer.git
   ```
2. **Install frontend dependencies**
   ```bash
   cd landmark-next-app
   npm i
   ```
3. **Install backend dependencies**
   ```bash
   cd ../landmark-backend-api
   dotnet restore
   ```
4. **Setup configuration files**

   Create .env files in the root levels of the frontend and backend directories:
   
   - landmark-next-app / frontend:
     - .env
     - .env.local
   - landmark-backend-api /backend:
     - .env.Development
     - appsettings.Development.json

    Copy the variable names from each env.example or appsettings.json file to their corresponding file created above

6. **Environment Variables**:

   *Currently in progress*


  
  
