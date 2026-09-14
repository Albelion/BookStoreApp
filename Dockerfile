# Этап 1: Сборка frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend

# Копируем React-приложение в контейнер
COPY ./BookStoreApp/frontend/package*.json ./
RUN npm install --verbose
COPY ./BookStoreApp/frontend ./

# Сборка React - приложения
RUN npm run build

# Этап 2: Сборка backend
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS backend-build
WORKDIR /src

# Копируем файл решения и проект
COPY BookStoreApp.sln ./
COPY ./BookStoreApp/BookStoreApp.csproj ./BookStoreApp/
RUN dotnet restore

# Копируем все остальные файлы и выполняем сборку
COPY ./BookStoreApp ./BookStoreApp/
WORKDIR /src/BookStoreApp
RUN dotnet publish -c Release -o /app/publish /p:SkipSpaBuild=true

# Этап 3: Финальный образ
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app

# Копируем фронтенд из сборочного контейнера со сброкой React
COPY --from=frontend-build /app/frontend/build ./wwwroot

# Копируем backend из сборки
COPY --from=backend-build /app/publish .


# Указываем порты
EXPOSE 80
EXPOSE 443

# Запускаем приложение
ENTRYPOINT [ "dotnet", "BookStoreApp.dll" ]