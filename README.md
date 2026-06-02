# David Pieris Solar System (DPMC) - Code Generator

A full-stack application built for generating and persisting deposit codes. It features a responsive React (Vite) frontend, an Express.js backend, and a self-contained SQLite database.

---

## 📊 System Architecture & Flow

Here is the data and process flow from the Frontend to the Backend API and SQLite Database:

```mermaid
flowchart TD
    %% Styling
    classDef fe fill:#1E5F9B,stroke:#333,stroke-width:1px,color:#fff;
    classDef feVal fill:#855010,stroke:#333,stroke-width:1px,color:#fff;
    classDef feHttp fill:#0A5C43,stroke:#333,stroke-width:1px,color:#fff;
    classDef feRes fill:#386B0B,stroke:#333,stroke-width:1px,color:#fff;
    
    classDef beRoute fill:#0A5C43,stroke:#333,stroke-width:1px,color:#fff;
    classDef beVal fill:#855010,stroke:#333,stroke-width:1px,color:#fff;
    classDef beLogic fill:#44337A,stroke:#333,stroke-width:1px,color:#fff;
    classDef beDup fill:#6B2E16,stroke:#333,stroke-width:1px,color:#fff;
    classDef beSave fill:#275A0E,stroke:#333,stroke-width:1px,color:#fff;
    
    classDef dbEngine fill:#1E5F9B,stroke:#333,stroke-width:1px,color:#fff;
    classDef dbSchema fill:#2D3748,stroke:#A0AEC0,stroke-width:1px,color:#fff;

    subgraph FRONTEND [FRONTEND - React/Vite]
        direction TB
        F1["Landing page<br/><small>Company branding</small>"] -- Enter --> F2["Deposit form<br/><small>Name + ID Number</small>"]
        F2 -- Submit --> F3["FE validation<br/><small>Empty field check</small>"]
        F3 --> F4["HTTP POST request<br/><small>POST /api/codes</small>"]
        F5["Result display<br/><small>Show generated code</small>"]
    end

    subgraph BACKEND_API [BACKEND - Express.js API]
        direction TB
        B1["Route handler<br/><small>Express.js controller</small>"]
        B2["Input validation<br/><small>Sanitise name & ID</small>"]
        B3["Code generation logic<br/><small>Name + last 5 of ID</small>"]
        B4["Duplicate check<br/><small>Query existing codes</small>"]
        B5["Save to database<br/><small>INSERT deposit record</small>"]
    end

    subgraph DATABASE [DATABASE - SQLite]
        direction TB
        D1["SQLite Engine<br/><small>dpmc.db</small>"]
        D2["deposit_codes table<br/>---<br/>id: INTEGER PK AUTOINCREMENT<br/>name: TEXT NOT NULL<br/>id_number: TEXT NOT NULL<br/>code: TEXT NOT NULL<br/>created_at: TEXT DEFAULT datetime"]
    end

    %% Flow lines
    F4 -- HTTP --> B1
    B1 --> B2
    B2 --> B3
    B3 --> B4
    B3 --> B5
    B5 --> D1
    D1 --- D2
    B4 -- SQL Query --> D2
    B5 -- JSON response --> F5

    %% Assign classes
    class F1,F2 fe;
    class F3 beVal;
    class F4 beRoute;
    class F5 feRes;
    class B1 beRoute;
    class B2 beVal;
    class B3 beLogic;
    class B4 beDup;
    class B5 beSave;
    class D1 dbEngine;
    class D2 dbSchema;
```

---

## 🗄️ Database Schema & Details

The database is built on **SQLite**, which stores all data locally inside a single database file.

### Database File Location
`dpmc-database/dpmc.db` *(Auto-generated when the backend runs)*

### Table: `deposit_codes`

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Auto-incremented Unique ID |
| `name` | `TEXT` | `NOT NULL` | Depositor's full/short name |
| `id_number` | `TEXT` | `NOT NULL` | Depositor's ID number (NIC/Passport) |
| `code` | `TEXT` | `NOT NULL` | The unique generated code |
| `created_at` | `TEXT` | `DEFAULT (datetime('now'))` | Timestamp of code creation |

---

## ⚙️ Running Locally

Follow these instructions to start both parts of the application.

### 1. Backend Server
Open a terminal in the `dpmc-backend` folder:
```bash
cd dpmc-backend
npm run dev
```
* **Runs on:** http://localhost:5000
* **Interactive Inspection:** Run `node view-db.js` in the backend folder to view database entries in a table format directly from your CLI.

### 2. Frontend App
Open another terminal in the `dpmc-frontend` folder:
```bash
cd dpmc-frontend
npm run dev
```
* **Runs on:** http://localhost:5173

---

## 🌐 Deploying & Hosting

To host the backend and SQLite database online, follow these requirements:

1. **Persistent Volume**: Since SQLite is file-based, you must use a cloud host that supports persistent volumes/disks (such as **Render.com**, **Railway.app**, **Fly.io**, or any standard **Linux VPS**).
2. **Environment Variable**: Configure the database location using the `DATABASE_PATH` environment variable in your production environment:
   ```env
   DATABASE_PATH=/opt/dpmc-database/dpmc.db
   ```
