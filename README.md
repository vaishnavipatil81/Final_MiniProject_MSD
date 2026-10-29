# CertifyMe — Course Learning and Certificate Platform

A starter full-stack learning platform built with React, Vite, Express, and MongoDB. Students can explore courses, enroll, study lesson content, track lesson completion, take a short final quiz, and request a completion certificate. Certificates can be looked up using their unique ID.

## Features
- Course catalogue with search and course detail view
- Course enrollment and a personal My Learning page
- Four guided lessons per course with explanations, bullet points, and code/examples
- Browser-persisted enrollment and lesson progress
- Final 3-question quiz; at least 2 correct answers are required
- Certificate issuance through the Express/MongoDB API after lessons and quiz are completed
- My Certificates and public certificate verification pages

## Requirements
- Node.js 20+
- MongoDB local or Atlas connection

## Run locally

### 1. Start the backend
```powershell
cd server
Copy-Item .env.example .env
npm install
npm run dev
```
Set `MONGODB_URI` in `server/.env` if you use MongoDB Atlas. The default is a local MongoDB database.

### 2. Start the frontend in a second terminal
```powershell
cd client
npm install --legacy-peer-deps
npm run dev
```
Open the Vite URL shown in the terminal (usually http://localhost:5173).

## Important limitations
This is a learning-project starter, not a production-ready LMS. Student enrollment and lesson progress are currently stored in the browser's local storage and are not linked to a secure student account. Certificate creation is called from the frontend; a production system must verify enrollment, lesson progress, quiz score, student identity, and authorization on the server before issuing a certificate. Add secure authentication, role-based authorization, server-side course/progress models, input validation, rate limiting, and proper downloadable PDF certificates before real deployment.
