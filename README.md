# 🔒 Signal Clone – Secure Messaging Platform

A modern **Signal-inspired secure messaging platform** built as a Full Stack SDE Assignment.

The application recreates Signal's clean, privacy-first interface while implementing real-time messaging using **FastAPI WebSockets**, user authentication, and a responsive React frontend.

---

## 🚀 Tech Stack

### Frontend
- React
- TypeScript
- TanStack Router
- Tailwind CSS
- Motion
- Lucide Icons

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- WebSockets
- Passlib (bcrypt)
- Pydantic

---

# ✨ Features

## Authentication

- User Registration
- User Login
- Password Hashing using bcrypt
- Session-ready authentication flow

---

## Landing Page

- Signal-inspired landing page
- Responsive hero section
- Feature showcase
- Modern UI animations

---

## Dashboard

- Signal-style conversation sidebar
- Conversation search
- User profile section
- Theme toggle
- Responsive layout

---

## Messaging

- One-to-one chat interface
- Real-time communication using WebSockets
- Message timestamps
- Signal-style message bubbles
- End-to-end encryption indicator (UI simulation)

---

## Backend APIs

### REST APIs

- Register User
- Login User
- Health Check

### WebSocket

- Real-time messaging endpoint

---

## Database

SQLite database with SQLAlchemy ORM.

### User Table

| Field | Type |
|-------|------|
| id | Integer |
| username | String |
| email | String |
| password | Hashed String |

---

## Message Table

| Field | Type |
|-------|------|
| id | Integer |
| sender_id | Integer |
| receiver_id | Integer |
| content | Text |
| created_at | Timestamp |

---

# 🏗 Project Structure

```
signal-clone/

│
├── backend/
│   ├── app/
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── websocket.py
│   │
│   └── requirements.txt
│
├── src/
│   ├── components/
│   ├── routes/
│   ├── assets/
│   ├── lib/
│   └── styles/
│
├── public/
├── package.json
└── README.md
```

---

# 🏛 Architecture

```
                React Frontend
                       │
          REST APIs + WebSockets
                       │
                 FastAPI Backend
                       │
                 SQLAlchemy ORM
                       │
                  SQLite Database
```

---

# 📡 API Overview

## Register

```
POST /register
```

Creates a new user.

---

## Login

```
POST /login
```

Authenticates an existing user.

---

## Health Check

```
GET /
```

Backend status endpoint.

---

## WebSocket

```
ws://localhost:8000/ws/{user_id}
```

Used for real-time messaging between connected users.

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/ritiksharma2204/serene-whispers-51.git

cd serene-whispers-51
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

## Frontend Setup

Return to project root

```bash
cd ..
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend

```
http://localhost:8081
```

---

# 🔄 Real-Time Messaging

The application uses **FastAPI WebSockets** to establish persistent connections between clients for instant message delivery.

```
User A
   │
   ▼
FastAPI WebSocket
   │
SQLite
   │
   ▼
User B
```

---

# 🎨 UI Highlights

- Signal-inspired layout
- Clean conversation list
- Responsive chat interface
- Modern animations
- Dark mode support
- Minimalistic design
- Privacy-first visual experience

---

# 📌 Current Limitations

The following features are intentionally simplified or mocked for the scope of this assignment:

- Phone verification
- End-to-end encryption (UI simulation)
- Voice & Video Calls
- Stories
- Linked Devices
- Group Chats
- Typing Indicators
- Read Receipts
- File Attachments

---

# 🚀 Future Improvements

- JWT Authentication
- Group Messaging
- Typing Indicators
- Read Receipts
- Emoji Reactions
- File Sharing
- Push Notifications
- PostgreSQL Support
- Docker Deployment
- Cloud Deployment

---

# 👨‍💻 Author

**Ritik Sharma**

B.Tech Geoinformatics  
Netaji Subhas University of Technology (NSUT)

GitHub:
https://github.com/ritiksharma2204

---

# 📄 License

This project was developed solely for educational purposes as part of an SDE Full Stack Assignment.
