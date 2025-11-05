# Payment Orchestrator Web (Angular Frontend)

This is the **frontend UI** for the **Payment Orchestrator Lite** project.  
It provides the user interface for authentication, payment creation, viewing paginated payments, searching, and confirming payments — all powered by the backend API.

> 🔗 Backend API Repo: **https://github.com/kekgaugetswe/PaymentOrchestratorLite.Api**

---

## 🚀 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Angular 19** | Frontend framework |
| **Bootstrap 5** | UI styling |
| **ngx-toastr** | Toast notifications |
| **JWT Authentication** | Secured API communication |
| **REST API (ASP.NET Core)** | Backend services |

---

## 🔧 Prerequisites

Make sure you have the following installed:

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| Angular CLI | 19+ |

Verify your versions:

```bash
node -v
ng version
```
## 🟢 Running the Frontend (Angular)

### 1️⃣ Install Angular CLI (if not installed)

```bash
npm install -g @angular/cli
```
### 2️⃣ Install Dependencies

```bash
ng serve --open
```
####The app will automatically open at:
```bash
http://localhost:4200/
```

### 🔗 API Configuration (Important)

The Angular app communicates with the backend API.
Make sure your API is running — either locally or in Docker.

The frontend expects the API to be available at:

```bash

http://localhost:7297
```
If your API runs on a different port or host, update your environment config file:

```bash
src/environments/environment.ts
```
you'll find this
```ts
export const environment = {
  apiBaseUrl: 'http://localhost:7297',
};
```

