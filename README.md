#  RD Management System (Full Stack Project)

🔗 Live Demo: https://rdsystem-project.vercel.app

---

##  Project Overview
RD Management System is a full-stack web application designed to manage user records and passbook details efficiently. It provides complete CRUD operations with a clean UI and RESTful backend.

---

## 🛠 Tech Stack

### Frontend
- React
- Axios
- Bootstrap

### Backend
- Spring Boot
- Spring Web
- Spring Data JPA

### Database
- MySQL

---

##  Features

- Add new users
- Update user details
- Delete users
- View all users
- Search functionality
- Pagination support (if implemented)

---

## Architecture

This project follows a layered architecture:

Controller → Service → Repository → Entity

- **Controller** → Handles HTTP requests
- **Service** → Business logic
- **Repository** → Database interaction
- **Entity** → Data model

---

##  API Endpoints (Sample)

| Method | Endpoint       | Description        |
|--------|--------------|-------------------|
| POST   | /users       | Create user       |
| GET    | /users       | Get all users     |
| PUT    | /users/{id}  | Update user       |
| DELETE | /users/{id}  | Delete user       |

---

##  Testing

- APIs tested using Postman
- Verified CRUD operations

---

## Screenshots

(Add screenshots here)
- UI page
- Postman API
- Database

---

## ⚙️ How to Run Locally

### Backend
```bash
./gradlew bootRun
