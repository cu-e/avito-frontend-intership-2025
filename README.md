# Тестовое задание для стажёра Frontend (осенняя волна 2025)

![scheme](https://github.com/avito-tech/tech-internship/blob/main/Tech%20Internships/Frontend/Frontend-trainee-assignment-autumn-2025/schema%20(3).jpg)

## **Система управления объявлениями для модерации**

### **Описание задачи**

Необходимо разработать веб-приложение для модерации объявлений на платформе Авито. Это упрощённая версия внутренней
системы, которую используют модераторы для проверки и управления объявлениями пользователей.

### **Запуск**

#### Требования

- [Make](https://ru.wikipedia.org/wiki/Make) *(опционально)*
- Docker с поддержкой compose, запускаемый с отдельного пользователя, в ином случае make запускать от root пользователя
- Открытый 81 порт

#### Cо сценариями Make

**Запуск**

```bash
make prod-up
```

**Стоп**

```bash
make prod-down
```

**Ре-билд**

```bash
make prod-build
```

#### Запуск через docker compose

**Запуск**

```bash
docker compose --profile all -p avito-frontend-intership up -d
```

**Стоп**

```bash
docker compose -p avito-frontend-intership --profile all down
```
