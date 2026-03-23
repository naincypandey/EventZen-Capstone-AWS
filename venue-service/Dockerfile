FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 5059
ENTRYPOINT ["sh", "-c", "dotnet $(ls *.dll | head -n 1)"]