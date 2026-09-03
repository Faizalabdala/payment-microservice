# Payment Microservice

A standalone payment microservice: receives payment requests, processes them through Stripe, and records notifications. Built from scratch to production, with automated tests and CI/CD.

## Tech Stack
Node.js · Express · Prisma · PostgreSQL · Stripe · Docker · nginx · Vitest · GitHub Actions

## Highlights
- Layered architecture (controller · service · repository) with Zod validation
- Automated tests, including failure cases (a declined payment is never saved)
- Dockerized, with the database isolated from the internet and nginx as reverse proxy
- Hardened Linux server (key-based SSH, firewall, fail2ban)
- CI/CD with GitHub Actions: on every push, tests run and deploy is automatic

## Run Locally
```bash
git clone https://github.com/Faizalabdala/payment-microservice.git
cd payment-microservice
docker compose up -d --build
```

---
Built by **Faizal Abdala** : Informatics & Telecommunications Engineering student, ISUTC (Maputo).
