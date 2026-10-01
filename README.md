# Change Management & RBAC System

A full-stack **MERN application** developed to implement secure change management workflows with **Role-Based Access Control (RBAC)**.

## Tech Stack

* **Frontend:** React.js, React Router
* **Backend:** Node.js, Express.js, REST APIs
* **Database:** MongoDB
* **Security:** JWT, RBAC, permission-based authorization
* **Testing:** Postman, MongoDB Compass

## Key Features

* User authentication using JWT
* Role and permission management
* Role-based access to frontend pages
* Permission-based API authorization
* Change request workflow
* Admin dashboard for managing roles and permissions
* Audit logging of user activities
* Unauthorized requests return `403 Forbidden`

## Architecture

```text
React
  ↓
Node.js + Express REST API
  ↓
MongoDB
```

## Security

The project demonstrates:

* Role-Based Access Control
* Least privilege
* Separation of duties
* Authentication and authorization
* Protected API endpoints
* Audit logging

## Testing

APIs and authorization controls were tested using **Postman**, including authentication, role validation, permissions, protected routes, and unauthorized access scenarios.

## Future Improvements

* Multi-factor authentication
* Attribute-Based Access Control
* Automated testing
* Docker
* CI/CD with GitHub Actions
* Cloud deployment


Software Engineer | Cybersecurity | Full-Stack Development
