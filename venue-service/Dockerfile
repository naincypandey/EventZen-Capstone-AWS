# Stage 1: Build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy files and restore dependencies
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Stage 2: Run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 5059
# IMPORTANT: Replace 'VenueApp' with your actual .csproj name
ENTRYPOINT ["dotnet", "VenueApp.dll"]