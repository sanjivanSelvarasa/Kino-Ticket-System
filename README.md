# Kino-Ticket-System (Website

Web-App zum Anzeigen von Filmen, Detailseiten, Trailer über TMDB und Ticket-/Warenkorb-Flow mit Login (JWT + Refresh Cookie).
Stack: **Vue 3 + Vite + TypeScript + Pinia + Tailwind** (Frontend), **Node/Express** (Backend), **PostgreSQL + PostgREST** (DB/API) via Docker.

---

## Projektstruktur

```
Projekt/
 ├─ frontend/Kino-Ticket/     # Vue App
 ├─ backend/                  # Express API
 ├─ db/                       # DB Schema + Seed (Docker Init)
 └─ compose.yml               # Postgres + PostgREST
```

---

## Voraussetzungen

* **Node.js** (empfohlen: aktuelle LTS)
* **Docker Desktop** (oder Docker Engine + Compose)
* Freie Ports: **5173** (Frontend), **4000** (Backend), **3001** (PostgREST), **5432** (Postgres)

---

## Installation & Start (Quickstart)

### 1) Datenbank + PostgREST starten

Im Projektroot (wo `compose.yml` liegt):

```bash
docker compose -f compose.yml up -d
```

Beim ersten Start werden SQL Dateien aus `./db` automatisch ausgeführt (Schema + Seed).

---

### 2) Backend starten (Express)

In `Projekt/backend`:

```bash
npm install
npm run dev
```

Backend läuft standardmäßig auf: **[http://localhost:4000](http://localhost:4000)**

#### Backend `.env`

Datei: `Projekt/backend/.env`

Benötigte Variablen:

```env
PORT=4000
PGRST_URL=http://localhost:3001

TMDB_Token=DEIN_TMDB_BEARER_TOKEN

JWT_ACCESS_SECRET=irgendein_secret
JWT_REFRESH_SECRET=irgendein_secret
ACCESS_EXPIRES=10m
REFRESH_EXPIRES=30d
NODE_ENV=development
```

> Wichtig: Verwende deinen eigenen TMDB Bearer Token.

---

### 3) Frontend starten (Vue)

In `Projekt/frontend/Kino-Ticket`:

```bash
npm install
npm run dev
```

Frontend läuft auf: **[http://localhost:5173](http://localhost:5173)**

#### Frontend `.env`

Datei: `Projekt/frontend/Kino-Ticket/.env`

```env
VITE_API_BASE=http://localhost:4000/api
```

---

## Wichtige Services / Ports

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:4000`
* PostgREST: `http://localhost:3001`
* Postgres: `localhost:5432` (User/Pass/DB kommen aus `compose.yml`)

---

## Features (Kurz)

* Filmliste + Filmdetails (inkl. Program Times)
* Trailer Lookup über TMDB (YouTube Trailer)
* Auth: Register / Login / Refresh / Logout (JWT + httpOnly Refresh Cookie)
* Warenkorb:

  * Item hinzufügen (erstellt Room + Show + Ticket in Transaktion)
  * Cart anzeigen
  * Ticket „kaufen“ (Status update)
  * Ticket entfernen

---

## API (Backend) – wichtigste Endpoints

Basis: `http://localhost:4000/api`

* `GET /movie` – Filme inkl. `programtime`
* `GET /movie/:id` – Movie by id (über PostgREST)
* `GET /movies/:id/trailer` – Trailer von TMDB
* `GET /tmdb/search?q=...` – TMDB Suche

Auth:

* `POST /auth/register`
* `POST /auth/login`
* `POST /auth/refresh`
* `POST /auth/logout`
* `GET  /me` (Bearer Token)

Cart:

* `POST /cart` (auth required)
* `GET  /cart` (auth required)
* `PATCH /cart`
* `DELETE /cart/:ticketId`

---

## Stop / Reset

Stoppen:

```bash
docker compose -f compose.yml down
```

Kompletter Reset inkl. DB-Volume:

```bash
docker compose -f compose.yml down -v
```

---

## Troubleshooting

* **Ports belegt**: Prüfe ob 5173/4000/3001/5432 frei sind oder ändere sie in `.env` bzw. `compose.yml`.
* **DB nicht sauber**: `docker compose down -v` und erneut `up -d`.
* **CORS**: Backend erlaubt aktuell `http://localhost:5173` (siehe `backend/server.js`). Wenn du eine andere Frontend-URL nutzt, anpassen.

---
