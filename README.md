# Prashant Thainua — React + Node Portfolio

A recruiter-focused portfolio built with React, Vite, Node.js and Express. It explains the developer's stack in context and includes short interview-ready explanations of REST APIs, JWT, RBAC, middleware, relational schemas and React state.

## Run

```bash
npm run install:all
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api/health

## Production notes

The contact endpoint currently logs submissions. Before deployment, connect it to an email provider or database and add rate limiting, validation and spam protection.

The resume is included at `client/public/Prashant_Thainua_Resume.pdf` and is available through the Download Resume buttons.
