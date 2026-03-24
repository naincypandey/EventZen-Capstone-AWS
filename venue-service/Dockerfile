# Stage 1: Build (Using the SDK to compile)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# 1. Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# 2. Copy the rest of the code and publish the app to a folder called 'out'
COPY . ./
RUN dotnet publish -c Release -o out

# Stage 2: Run (Using the smaller Runtime to actually run the app)
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

# 3. Copy the compiled files from the 'build' stage
COPY --from=build /app/out .

EXPOSE 5059
# 4. Make sure 'VenueService.dll' matches your actual file name (case-sensitive!)
ENTRYPOINT ["dotnet", "VenueService.dll"]