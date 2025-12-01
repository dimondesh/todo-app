# 🚀 Task Manager

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
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

### 1. Clone the Repository
Bash
git clone [https://github.com/dimondesh/todo-app.git](https://github.com/dimondesh/todo-app.git)
cd task-manager
Bash

2. Backend Setup
Navigate to the backend folder and install dependencies:

Bash

cd backend
npm install
Create a .env file in the backend folder:

Env snippet

PORT=5000
DATABASE_URL="your_postgres_connection_string"
JWT_SECRET="your_super_secret_key"
Initialize the database:

Bash

npx prisma generate
npx prisma db push
Start the server:

Bash

npm run dev
# Server will run on http://localhost:5000
3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:

Bash

cd ../frontend
npm install
Create a .env.local file in the frontend folder:

Code snippet

NEXT_PUBLIC_API_URL=http://localhost:4000/api
Start the client:

Bash

npm run dev
# App will run on http://localhost:3000
