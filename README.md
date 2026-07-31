# Quiz Challenge App

This is a full-stack MERN application (MongoDB, Express, React, Node.js) built for a mobile-first resolution (1080x1920) on the web.

## Prerequisites
- **Node.js** installed on your system.
- **MongoDB** connection string (MongoDB Atlas or Local MongoDB).

---

## 1. Setting up the Database

Before running the backend, you need to configure the database connection.

1. Navigate to the `backend` folder.
2. Open the `.env` file.
3. Replace `<db_password>` with your actual MongoDB database password.

---

## 2. How to Run the App

To run the application, you need to start both the backend server and the frontend server. 
**Important Note for Windows Users:** Please use the standard **Command Prompt (`cmd`)** or **Git Bash** instead of PowerShell, as PowerShell may cause errors with `npm` commands on your machine.

### Start the Backend
1. Open a new Command Prompt (`cmd`).
2. Navigate to the backend folder:
   ```cmd
   cd backend
   ```
3. Install dependencies (if you haven't already):
   ```cmd
   npm install
   ```
4. *(Optional but recommended)* Seed the database with initial questions:
   ```cmd
   node seed.js
   ```
5. Start the backend server:
   ```cmd
   node server.js
   ```
   *The backend will run on `http://localhost:5000`.*

### Start the Frontend
1. Open a **second** Command Prompt (`cmd`) window.
2. Navigate to the frontend folder:
   ```cmd
   cd frontend
   ```
3. Install dependencies (if you haven't already):
   ```cmd
   npm install
   ```
4. Start the frontend development server:
   ```cmd
   npm run dev
   ```
5. Open your browser and go to the link provided (usually **`http://localhost:5173`**).

---

## Troubleshooting
- **MongoParseError: Invalid connection string**: This means your database password in `backend/.env` is missing or incorrect.
- **Get-Member Error in Terminal**: You are using PowerShell. Please switch to Command Prompt (`cmd`).
