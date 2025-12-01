# 🚀 Task Manager

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-5.0-white?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

A full-stack, modern Task Management application featuring a rich UI, secure authentication, and advanced task organization capabilities like drag-and-drop sorting.

---

## ✨ Features

This project fulfills all test task requirements and includes several bonus features.

### Core Functionality
* **🔐 Authentication:** Secure Login and Registration system using JWT & bcrypt.
* **📝 CRUD Operations:** Create, Read, Change the order and Delete tasks efficiently.
* **🔍 Search:** Real-time search filtering by task title.
* **🏷️ Filters:** Filter tasks by status (All, Completed, Active).
* **📊 Sorting:** Sort tasks by Priority (High/Low) or Date.

### 🔥 Bonus Features
* **✋ Drag-and-Drop:** Intuitive manual reordering of tasks using `react-dnd`.
* **📅 Due Dates:** Integrated calendar for setting task deadlines via `date-fns`.
* **📂 Categories:** Categorize tasks (Work, Personal, Music, Coding, etc.).
* **🎨 Modern UI:** Sleek "Dark Slate" design using **shadcn/ui** and Tailwind CSS.
* **📱 Fully Responsive:** Optimized layout for desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
* **Framework:** Next.js 16
* **Language:** TypeScript
* **Styling:** Tailwind CSS, clsx, tailwind-merge
* **UI Components:** shadcn/ui (Radix UI based)
* **State/Interactivity:** React Hooks, React DnD (Drag and Drop)
* **Icons:** Lucide React

### Backend (`/backend`)
* **Runtime:** Node.js
* **Framework:** Express.js (ES Modules)
* **Database:** PostgreSQL (Prisma)
* **ORM:** Prisma 5 (Stable)
* **Authentication:** JSON Web Tokens (JWT)
* **Security:** CORS, Environment variables, Password hashing

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v18+)
* npm or yarn
* A PostgreSQL database URL

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/task-manager.git](https://github.com/your-username/task-manager.git)
cd task-manager
2. Setup Backend
Open your terminal and run the following commands to set up the server and database:

Bash

cd backend
npm install

# 1. Create .env file (Copy this block or create manually)
echo "PORT=4000" > .env
echo "DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE" >> .env
echo "JWT_SECRET=super_secret_key_change_me" >> .env

# 2. Initialize Database
npx prisma generate
npx prisma db push

# 3. Start Backend Server
npm run dev
Server will start on http://localhost:4000

3. Setup Frontend
Open a new terminal tab (keep the backend running) and navigate to the frontend folder:

Bash

cd ../frontend
npm install

# 1. Configure API URL
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local

# 2. Start Frontend Application
npm run dev
Client will start on http://localhost:3000
