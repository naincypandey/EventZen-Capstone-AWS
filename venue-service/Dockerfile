FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
# ... (rest of the build stage)
FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app

# Copy project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build the app
COPY . ./
RUN dotnet publish -c Release -o out

# Stage 2: Run
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 5059
ENTRYPOINT ["dotnet", "VenueService.dll"]