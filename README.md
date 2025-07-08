# 📘 HackerNews UI

A modern Angular standalone application that displays the top 200 stories from News via the HackerNews API.

---

## 🚀 Features

- ✅ Angular 17+ with **Standalone Components**
- ✅ Integrated with `.NET Web API` (`HackerNews.WebApi`)
- ✅ Loader while fetching data
- ✅ Error-safe service with graceful failure
- ✅ Fully functional routing with fallback
- ✅ Minimal dependencies & clean architecture
- ✅ Code coverage enabled with unit tests

---

## 🌐 Backend API Requirement

Before running this UI, make sure your backend (`HackerNews.WebApi`) is up at:

```http
https://localhost:7294/api/news/top
```

Expected response:

```json
[
  {
    "title": "Sample News",
    "url": "https://example.com"
  }
]
```

---

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Root standalone component
│   │   ├── app.config.ts          # ApplicationConfig for DI & Routing
│   │   ├── app.routes.ts          # Route definitions
│   │   ├── services/
│   │   │   └── story.service.ts   # Talks to backend API
│   │   └── components/
│   │       └── story-list/
│   │           ├── story-list.component.ts
│   │           ├── story-list.component.html
│   │           └── story-list.component.scss
├── README.md
```

---

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the App

Make sure your backend API is running on `https://localhost:7294`.

```bash
ng serve
```

Visit in browser:  
👉 http://localhost:4200

---

## 🧪 Run Unit Tests with Coverage

```bash
ng test --no-watch --code-coverage
```

Output HTML report:  
📁 `coverage/index.html`

Expected: ✅ **60–70%+** coverage

---

## ⚙️ Troubleshooting

| Issue                        | Solution                                                                 |
|-----------------------------|--------------------------------------------------------------------------|
| `ng: command not found`     | Install Angular CLI globally: `npm install -g @angular/cli`              |
| `CORS` error in browser     | Enable CORS in `.NET` backend with `AllowAnyOrigin()`                    |
| API not loading             | Confirm `HackerNews.WebApi` is running on `https://localhost:5001`         |

---

## ✅ GitHub Checklist

- [x] Upload entire folder structure
- [x] No zip files
- [x] Include this `README.md`
- [x] Ensure successful `ng build` and `ng test`

---

## 👨‍💻 Author

Developed with ❤️ by [Dharmik Shah]

---