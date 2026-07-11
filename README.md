# Signal Clone – Secure Messaging Platform

A full-stack secure messaging application inspired by **Signal Messenger**, built as part of an SDE Full-Stack Assignment.

The project recreates Signal's modern, privacy-focused interface and core messaging workflows using **React + TypeScript** on the frontend and **FastAPI + SQLite** on the backend, with **WebSockets** enabling real-time communication.

---

## Demo

**Live Demo:** _Add your deployed URL here_

**GitHub Repository:** _Add your GitHub repository URL here_

---

# Features

## Authentication

- User Registration
- User Login
- Password hashing using bcrypt
- Session-ready authentication flow
- Mocked authentication suitable for assignment requirements

---

## Conversations

- Signal-inspired conversation list
- Search conversations
- Last message preview
- Online / Active status (UI)
- Modern responsive sidebar

---

## Messaging

- One-to-one chat interface
- Real-time messaging using WebSockets
- Message timestamps
- Signal-style message bubbles
- End-to-end encryption indicator (UI simulation)

---

## User Interface

- Signal-inspired landing page
- Responsive dashboard
- Clean minimal interface
- Dark / Light theme support
- Animated transitions using Motion
- Modern component-based architecture

---

## Backend

- FastAPI REST APIs
- SQLAlchemy ORM
- SQLite Database
- WebSocket support
- Clean modular architecture

---

# Tech Stack

## Frontend

- React
- TypeScript
- TanStack Router
- Tailwind CSS
- Motion
- Lucide Icons

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- WebSockets
- Passlib (bcrypt)
- Pydantic

---

# Project Structure

```
.
├── backend
│   ├── app
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── websocket.py
│   └── requirements.txt
│
├── src
│   ├── components
│   ├── routes
│   ├── lib
│   ├── assets
│   └── styles
│
├── public
└── package.json
```

---

# Architecture

```
                React Frontend
                       │
            REST API + WebSockets
                       │
                 FastAPI Backend
                       │
                 SQLAlchemy ORM
                       │
                  SQLite Database
```

---

# Database Schema

## Users

| Field | Type |
|--------|------|
| id | Integer |
| username | String |
| email | String |
| password | Hashed Password |

---

## Messages

| Field | Type |
|--------|------|
| id | Integer |
| sender_id | Integer |
| receiver_id | Integer |
| content | Text |
| created_at | Timestamp |

---

# API Overview

## Authentication

### Register

```
POST /register
```

Creates a new user.

---

### Login

```
POST /login
```

Authenticates a user.

---

### Health Check

```
GET /
```

Backend status endpoint.

---

## WebSocket

```
ws://localhost:8000/ws/{user_id}
```

Provides real-time messaging between connected users.

---

# Setup Instructions

## Clone Repository

```bash
git clone <repository-url>

cd signal-clone
```

---

# Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

# Frontend Setup

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs on

```
http://localhost:8081
```

---

# Real-Time Communication

Real-time messaging is implemented using **FastAPI WebSockets**.

Workflow:

```
Browser A
      │
      ▼
 WebSocket
      │
 FastAPI
      │
 WebSocket
      ▼
Browser B
```

---

# Design Goals

The UI was designed to closely resemble the original Signal Messenger by focusing on:

- Minimal design
- Privacy-first appearance
- Conversation-first workflow
- Responsive layout
- Smooth animations
- Clean typography
- Familiar Signal color palette

---

# Assumptions

- Phone number verification is mocked.
- End-to-end encryption is simulated through the interface only.
- Voice and video calls are placeholders.
- Authentication is simplified for demonstration purposes.

---

# Future Improvements

- Group messaging
- Attachments
- Emoji reactions
- Read receipts
- Typing indicators
- User presence
- JWT Authentication
- Docker support
- PostgreSQL deployment
- File uploads
- Push notifications

---


# Author

**Ritik Sharma**

B.Tech Geoinformatics  
Netaji Subhas University of Technology (NSUT)

GitHub: https://github.com/ritiksharma2204

---

# License

This project was developed for educational purposes as part of an SDE Full-Stack Assignment.
