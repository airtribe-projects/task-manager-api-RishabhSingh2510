# 🗂 Task Manager API

A simple RESTful Task Manager API built with **Node.js** and **Express**.
This project demonstrates CRUD operations, validation middleware, filtering, sorting, priority management, and automated API testing using **tap** and **supertest**.

All data is stored in memory (no database yet).

---

## 🚀 Features

* Create, Read, Update, Delete tasks
* Task priority support (`low`, `medium`, `high`)
* Filter tasks by completion
* Sort tasks by creation date
* Fetch tasks by priority
* Input validation middleware
* Automated API tests

---

## 🛠 Tech Stack

* Node.js
* Express
* tap (testing)
* supertest (API testing)

---

## 📁 Project Structure

```
task-manager-api/
│
├── app.js
├── server.test.js
├── package.json
├── README.md
├── test/
│   └── server.test.js
└── node_modules/
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd task-manager-api
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Start the server

```bash
node app.js
```

Server runs at:

```
http://localhost:3000
```

---

## 📌 API Endpoints

Base URL:

```
http://localhost:3000
```

---

### ✅ Get all tasks

```
GET /tasks
```

Optional query params:

* `completed=true|false`
* `sort=asc|dsc`

Example:

```
/tasks?completed=true&sort=asc
```

---

### ✅ Get task by ID

```
GET /tasks/:id
```

Example:

```
/tasks/1
```

---

### ✅ Get tasks by priority

```
GET /tasks/priority/:level
```

Levels:

* low
* medium
* high

Example:

```
/tasks/priority/high
```

---

### ✅ Create task

```
POST /tasks
```

Body:

```json
{
  "title": "Learn Node",
  "description": "Practice Express",
  "completed": false,
  "priority": "high"
}
```

`priority` is optional (defaults to `medium`).

---

### ✅ Update task

```
PUT /tasks/:id
```

Body:

```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true,
  "priority": "low"
}
```

---

### ✅ Delete task

```
DELETE /tasks/:id
```

---

## 🧪 Running Tests

This project uses **tap** + **supertest**.

Run:

```bash
npm test
```

You should see:

```
PASS test/server.test.js
```

---

## 📄 Test Coverage

Tests include:

* Create task
* Invalid task creation
* Get all tasks
* Get task by ID
* Update task
* Invalid updates
* Delete task
* Invalid delete
* Validation errors

Located in:

```
test/server.test.js
```

---

## 🧠 Notes

* Data is stored in memory (resets on server restart)
* Priority defaults to `medium`
* Validation ensures:

  * title & description are strings
  * completed is boolean
  * priority is low/medium/high

---

## 🚧 Future Improvements

* MongoDB + Mongoose
* PATCH endpoint
* Pagination
* Centralized error handler
* Authentication
* MVC folder structure

---

## 👤 Author

Rishabh Singh

