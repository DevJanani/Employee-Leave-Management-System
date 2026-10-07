# Employee Leave Management System

A full-stack web application for managing employees and employee leave requests.

## Project Overview

The Employee Leave Management System allows employees to submit leave requests and view their leave history. Administrators can manage employees, review leave requests, and approve or reject leave applications.

## Features

### Employee

- Login
- View dashboard
- View and update profile
- Change password
- Submit leave requests
- View leave history
- Track leave request status

### Admin

- Admin login and access control
- Dashboard with employee and leave statistics
- Add employees
- Edit employee details
- View employees
- View leave requests
- Approve or reject leave requests
- View leave history
- Update profile and change password

## Technologies Used

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
- REST API
- MySQL
- python-dotenv

## Project Structure

```text
Employee-Leave-Management-System/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── app.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
│
└── .gitignore