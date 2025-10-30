## SGP Mentorlink

![status](https://img.shields.io/badge/status-active-success)
![node](https://img.shields.io/badge/Node.js-16%2B-43853d?logo=node.js&logoColor=white)
![react](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![license](https://img.shields.io/badge/license-Custom-lightgrey)

A full‑stack mentoring platform that connects students with mentors. It includes real‑time chat, meetings, posts, notifications, admin tools, and email workflows.

### Table of Contents
- [Monorepo Layout](#monorepo-layout)
- [Key Features](#key-features)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Install](#install)
- [Run (Development)](#run-development)
- [Build](#build)
- [Tech Stack](#tech-stack)
- [Project Structure Highlights](#project-structure-highlights)
- [Common Scripts](#common-scripts)
- [Links](#links)
- [Deployment Notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

### Monorepo Layout
- `client/` — React app (Create React App + CRACO, Tailwind, MUI, Redux, Socket.IO client)
- `server/` — Node.js/Express API (MongoDB/Mongoose, JWT auth, Socket.IO, Nodemailer, Cloudinary)

### Key Features
- User roles: Admin, Mentor, Student
- Auth, authorization, and rate‑limiting
- Real‑time chat and notifications
- Meetings (via `@jitsi/react-sdk` integration)
- Posts, comments, interactions, logs, and stats
- Email flows: verification, reset, templates with Handlebars
- File uploads (Multer) and media storage (Cloudinary)

---

## Prerequisites
- Node.js 16+ and npm
- MongoDB instance (local or hosted)
- Cloudinary account (for media)
- SMTP credentials (Nodemailer)

---

## Environment Variables

Create two `.env` files: one in `server/`, one in `client/`.

### Server `.env` (place in `server/.env`)
```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/mentorlink

# Auth
JWT_SECRET=replace-with-strong-secret
JWT_EXPIRES_IN=7d

# Client URL (CORS, email links)
CLIENT_URL=http://localhost:3000

# Email (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-user
SMTP_PASS=your-pass
FROM_EMAIL="Mentorlink <no-reply@yourdomain.com>"

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Optional
TIMEZONE=Asia/Calcutta
```

### Client `.env` (place in `client/.env`)
```
# API base URL
REACT_APP_API_URL=http://localhost:5000

# Socket.IO endpoint (if different from API URL)
REACT_APP_SOCKET_URL=http://localhost:5000

# Google reCAPTCHA
REACT_APP_RECAPTCHA_SITE_KEY=your-site-key
```

Note: In Create React App, client env vars must be prefixed with `REACT_APP_`.

---

## Install

From the repo root:
```bash
cd server && npm install
cd ../client && npm install
```

---

## Run (Development)

Run API (Express):
```bash
cd server
npm run dev
# Starts: nodemon TZ='Asia/Calcutta' src/index.js (see server/package.json)
```

Run Web (React):
```bash
cd client
npm run dev
# Starts CRACO dev server on http://localhost:3000
```

Open the app at `http://localhost:3000`.

---

## Build

Client production build:
```bash
cd client
npm run build
```
Assets will be generated under `client/build/`.

Server production start (ensure `server/.env` is set):
```bash
cd server
npm start
```

---

## Tech Stack

- Client: React 18, CRACO, Tailwind CSS, MUI, Redux/Thunk, React Router v5, Chart.js, SunEditor, Socket.IO client
- Server: Node.js, Express, Mongoose (MongoDB), JWT, Multer, Cloudinary, Nodemailer, HBS templates, Socket.IO, node-cron, rate limiting

---

## Project Structure Highlights

- `server/src/config/` — DB, mailer, multer, cloudinary
- `server/src/models/` — Mongoose schemas (Admin, Student, Mentor, Post, Meeting, etc.)
- `server/src/controllers/` — REST controllers
- `server/src/routes/` — API routes (admin, mentor, student, posts, chat, meeting, notification)
- `server/views/` — Handlebars email templates
- `client/src/components/` — UI components (auth, dashboard, notifications, etc.)
- `client/src/actions/` and `client/src/reducers/` — Redux
- `client/src/api/` — API helpers

---

## Common Scripts

### Client (`client/package.json`)
- `npm run dev` — Start CRA dev server via CRACO
- `npm run build` — Production build
- `npm test` — Run tests

### Server (`server/package.json`)
- `npm run dev` — Start API with nodemon
- `npm start` — Start API with node

---


## Links

- Client README: `client/README.md`
- Server README: `server/README.md`
- Issue Tracker: use the GitHub Issues tab

---

## Deployment Notes

- Configure environment variables on your host (see `.env` samples).
- Serve `client/build` via a static host or reverse proxy to the API.
- Ensure CORS and `CLIENT_URL` are aligned between client and server.
- Configure SMTP and Cloudinary for production.

---

## Troubleshooting

- Ports in use: change `PORT` or close conflicting processes.
- CORS errors: verify `CLIENT_URL` and server CORS config.
- JWT/401 issues: confirm `JWT_SECRET` and token lifetimes.
- Media upload errors: validate Cloudinary credentials.
- Email not sending: check SMTP host/port, credentials, and firewall.
- Socket connection issues: confirm `REACT_APP_SOCKET_URL` and server Socket.IO initialization.

---

## Contributing

Contributions are welcome! To propose a change:

1. Fork the repo and create a feature branch.
2. Make your edits with clear commit messages.
3. Open a Pull Request describing the change and motivation.

For bugs or feature requests, open a GitHub Issue with steps to reproduce or a clear proposal.

---

## License

Proprietary — for academic/project use unless a license file states otherwise.



