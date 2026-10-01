# Change Management & RBAC System

A full-stack **Change Management System** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** with a focus on **Role-Based Access Control (RBAC), authentication, authorization, permissions, and audit logging**.

The project was developed as an independent study to explore how security policies and access-control requirements can be implemented as practical software components in a web application.

## 🎯 Project Overview

In enterprise environments, different users require different levels of access to systems and sensitive operations.

This application implements a data-driven RBAC model that allows administrators to:

* Manage users and roles
* Define granular permissions
* Assign permissions to roles
* Control access to frontend pages
* Protect backend API endpoints
* Manage change requests through role-based workflows
* Record user activities through audit logs

The system demonstrates security principles such as **least privilege, separation of duties, authentication, authorization, accountability, and secure access control**.

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* JavaScript
* HTML5
* CSS3
* REST API integration

### Backend

* Node.js
* Express.js
* RESTful APIs
* JWT authentication
* Authorization middleware

### Database

* MongoDB

### Development & Testing

* Git
* GitHub
* Postman
* MongoDB Compass
* Visual Studio Code

## 🔐 Key Security Features

### Role-Based Access Control

The application uses RBAC to associate users with roles and roles with permissions.

Example roles include:

```text
Requester
Approver
Auditor
Admin
```

Permissions can be assigned to roles rather than individual users, making the access-control model easier to manage and extend.

### Authentication

The backend uses **JSON Web Tokens (JWT)** to authenticate users.

Each protected API request is validated before access is granted.

### Authorization Middleware

Authorization is enforced at the backend through reusable middleware.

Two key authorization approaches are implemented:

```text
authorizeRoles()
checkPermission()
```

`authorizeRoles()` verifies whether a user's role is allowed to access a protected endpoint.

`checkPermission()` provides more granular authorization by checking whether the user's role contains the required permission for a specific operation.

### Frontend Route Protection

React Router is used to control access to frontend pages.

Users are redirected to role-specific dashboards after authentication, and restricted pages are protected based on the user's role and permissions.

### Audit Logging

Security-relevant actions are recorded in audit logs.

Example information captured includes:

```text
User ID
Timestamp
Action
Target Change Request
Result
```

Authorized auditors can review these records through the application interface.

## 🔄 Change Management Workflow

The system supports a role-based change management workflow.

```text
Requester
    │
    │ Submit Change Request
    ▼
Change Request
    │
    ▼
Approver
    │
    │ Approve / Reject
    ▼
Change Process
    │
    ▼
Audit Log
    │
    ▼
Auditor
```

The RBAC model ensures that sensitive operations, such as approving changes, are restricted to authorized roles.

## 🏗️ System Architecture

```text
┌─────────────────────────────┐
│       React Frontend        │
│                             │
│  Dashboards                 │
│  Role Management            │
│  Permission Management      │
│  Change Management          │
│  Audit Log Interface        │
└──────────────┬──────────────┘
               │
               │ REST APIs
               ▼
┌─────────────────────────────┐
│     Node.js / Express       │
│                             │
│  Authentication             │
│  Authorization Middleware   │
│  Business Logic             │
│  Change Management APIs     │
│  Audit Logging              │
└──────────────┬──────────────┘
               │
               │ MongoDB Driver
               ▼
┌─────────────────────────────┐
│          MongoDB            │
│                             │
│  Users                      │
│  Roles                      │
│  Permissions                │
│  Change Requests            │
│  Audit Logs                 │
└─────────────────────────────┘
```

## 📂 Project Structure

```text
change-management-rbac-system/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── server.js
│
├── README.md
└── .gitignore
```

> The exact folder structure may vary depending on the implementation.

## 🧪 Testing

The backend APIs were tested using **Postman**.

Testing covered:

* Authentication
* Role validation
* Permission validation
* Protected API endpoints
* Unauthorized access attempts
* Change request operations
* Audit logging

For example, when a user without the required permission attempts to perform a restricted operation, the API returns:

```http
403 Forbidden
```

This demonstrates that authorization is enforced at the backend rather than relying only on frontend restrictions.

## 👨‍💻 Example Authorization Flow

```text
User Login
    │
    ▼
JWT Generated
    │
    ▼
Protected API Request
    │
    ▼
JWT Validation
    │
    ▼
Identify User / Role
    │
    ▼
Check Required Permission
    │
    ├── Authorized ──► Perform Operation
    │                       │
    │                       ▼
    │                   Create Audit Log
    │
    └── Unauthorized ─► 403 Forbidden
```

## 📊 Admin Dashboard

The Admin dashboard provides centralized management of:

* Users
* Roles
* Permissions
* Role-permission mappings
* Audit logs

A role-permission matrix allows administrators to enable or disable permissions using a toggle-based interface.

This allows permission changes to be managed through the application rather than requiring developers to modify source code.

## 🔒 Security Principles Demonstrated

This project demonstrates practical implementation of:

* Role-Based Access Control (RBAC)
* Least Privilege
* Separation of Duties
* Authentication
* Authorization
* JWT-based access control
* API-level security
* Frontend route protection
* Permission-based authorization
* Auditability
* Centralized security controls
* Secure change management workflows

## ⚠️ Limitations

The current implementation has several limitations:

* Permission management is manually configured by administrators.
* The system does not currently implement attribute-based access control.
* Contextual controls such as time-based or resource-based authorization are not implemented.
* Audit logging could be extended with real-time alerts and monitoring dashboards.
* Administrative permission changes require careful management to avoid unintended access.

## 🚀 Future Improvements

Potential improvements include:

* Attribute-Based Access Control (ABAC)
* More granular resource-level permissions
* Multi-factor authentication
* Refresh-token management
* Real-time security alerts
* Enhanced audit dashboards
* Automated security testing
* Docker containerization
* CI/CD using GitHub Actions
* Cloud deployment
* Centralized application logging
* Security monitoring integration

## 📚 Learning Outcomes

This project strengthened my practical understanding of:

* Full-stack MERN application development
* REST API design
* MongoDB data modelling
* JWT authentication
* RBAC architecture
* Authorization middleware
* React route protection
* Permission-based access control
* Secure application design
* Audit logging
* API testing with Postman
* Security-focused software development

## 👤 Author

**Kopiga Baskaran**

Software Engineer | Cybersecurity | Full-Stack Development | Automation

This project is part of my software engineering and cybersecurity portfolio and demonstrates practical experience in building secure full-stack web applications.
