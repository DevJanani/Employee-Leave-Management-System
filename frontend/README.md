# Employee Leave Management System

A full-stack Employee Leave Management System developed using React, Flask, and MySQL.

## Project Overview

This application allows employees to apply for leave and track their leave history. Admins can manage employees, view leave requests, and approve or reject leave applications.

## Features

### Employee

- Employee login
- Employee dashboard
- New leave request
- Employee ID auto-fill
- Submit leave request
- View leave history
- View profile
- Change password

### Admin

- Admin login
- Admin dashboard
- View total employees
- View pending, approved, and rejected leaves
- Add employees
- Edit employee details
- View employee list
- View leave requests
- Approve leave requests
- Reject leave requests
- View leave history
- View profile
- Change password

## Technology Stack

### Frontend

- React
- Vite
- React Router
- Bootstrap
- Recharts
- React Toastify

### Backend

- Python
- Flask
- Flask REST API

### Database

- MySQL

## Project Structure

```text
Employee-leave-management-system/
│
├── backend/
│   ├── routes/
│   ├── database.py
│   └── app.py
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── routes/
    │   ├── services/
    │   └── App.jsx
    │
    ├── package.json
    └── README.md