# 🚀 Cloud-Native Job Processing System

A production-style cloud-native distributed system that processes user-submitted jobs asynchronously using a microservices architecture.

This project demonstrates modern backend engineering practices including:

- Microservices architecture
- Asynchronous job processing
- Queue-based communication
- PostgreSQL persistence
- Redis messaging
- Background workers
- Clean architecture
- Docker containerization
- Docker Compose orchestration
- Kubernetes orchestration (planned)
- CI/CD automation (planned)

---

# 📌 Project Overview

The system allows users to:

1. Submit jobs through a REST API
2. Store jobs in PostgreSQL
3. Push jobs into a Redis queue
4. Process jobs asynchronously using worker services
5. Retrieve processing results later

The architecture is inspired by real-world distributed systems used in scalable cloud platforms.

---

# 🧠 System Architecture

```text
                ┌──────────────────┐
                │      Client      │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   API Service    │
                │  (Express API)   │
                └────────┬─────────┘
                         │
         ┌───────────────┴────────────────┐
         │                                │
         ▼                                ▼
┌──────────────────┐           ┌──────────────────┐
│   PostgreSQL     │           │   Redis Queue    │
│   Job Storage    │           │     BullMQ       │
└──────────────────┘           └────────┬─────────┘
                                         │
                                         ▼
                              ┌──────────────────┐
                              │  Worker Service  │
                              │ Background Jobs  │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │   PostgreSQL     │
                              │   Save Results   │
                              └──────────────────┘
```

---

# ⚙️ Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Queue / Messaging

- Redis
- BullMQ

## DevOps / Infrastructure

- Docker
- Docker Compose
- Kubernetes (planned)
- GitHub Actions (planned)

---

# 📂 Project Structure

```text
cloud-job-system/
│
├── api-service/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── queues/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   └── Dockerfile
│
├── worker-service/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── processors/
│   │   ├── queues/
│   │   └── worker.ts
│   └── Dockerfile
│
├── docs/
│   └── screenshots/
│
├── docker-compose.yml
└── README.md
```

---

# 🧩 Microservices Responsibilities

## API Service

The API Service is responsible for:

- Receiving HTTP requests
- Validating incoming jobs
- Saving jobs into PostgreSQL
- Sending jobs to Redis queue
- Returning job status and results

### Main Endpoints

#### Create Job

```http
POST /jobs
```

### Example Request

```json
{
  "type": "TEXT_PROCESSING",
  "payload": {
    "text": "Cloud native systems are powerful"
  }
}
```

### Example Response

```json
{
  "success": true,
  "message": "Job created successfully",
  "job": {
    "id": "c609abca-ca88-480a-96bd-ecbf0d6c7aef",
    "status": "PENDING"
  }
}
```

---

#### Get Job Result

```http
GET /jobs/:id
```

### Example Response

```json
{
  "success": true,
  "job": {
    "id": "c609abca-ca88-480a-96bd-ecbf0d6c7aef",
    "status": "COMPLETED",
    "result": {
      "uppercase": "CLOUD NATIVE SYSTEMS ARE POWERFUL",
      "wordCount": 5,
      "characterCount": 33
    }
  }
}
```

---

## Worker Service

The Worker Service is responsible for:

- Listening to Redis queue
- Consuming background jobs
- Processing tasks asynchronously
- Updating PostgreSQL results

### Current Processing Logic

The worker currently performs:

- Word count
- Character count
- Uppercase transformation

---

# 🔄 Job Lifecycle

```text
PENDING
   ↓
PROCESSING
   ↓
COMPLETED
```

If an error occurs:

```text
PENDING
   ↓
PROCESSING
   ↓
FAILED
```

---

# 🏗️ Clean Architecture

The API Service follows a layered architecture:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Database
```

## Responsibilities

### Routes

Connect endpoints to controllers.

### Controllers

Handle HTTP request/response logic.

### Services

Contain business logic.

### Repositories

Handle database operations.

This separation improves:

- Maintainability
- Scalability
- Testing
- Code organization

---

# 💻 Local Development Setup

## 1. Clone Repository

```bash
git clone <your-repository-url>
cd cloud-job-system
```

---

## 2. Setup PostgreSQL

Create a PostgreSQL database.

Example:

```text
Database Name: cloud_job_system
```

---

## 3. Configure Environment Variables

### API Service

Create:

```text
api-service/.env
```

Example:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/cloud_job_system?schema=public"
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=3000
```

---

### Worker Service

Create:

```text
worker-service/.env
```

Example:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/cloud_job_system?schema=public"
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## 4. Install Dependencies

### API Service

```bash
cd api-service
npm install
```

### Worker Service

```bash
cd ../worker-service
npm install
```

---

## 5. Generate Prisma Client

### API Service

```bash
cd api-service
npx prisma generate
```

### Worker Service

```bash
cd ../worker-service
npx prisma generate
```

---

## 6. Run Database Migration

```bash
cd api-service
npx prisma migrate dev --name init
```

---

## 7. Start API Service

```bash
cd api-service
npm run dev
```

Expected:

```text
API Service running on port 3000
```

---

## 8. Start Worker Service

```bash
cd worker-service
npm run dev
```

Expected:

```text
Worker service is running...
Worker connected to Redis and ready
```

---

# 🐳 Docker Compose Setup

The entire distributed system can now run using Docker Compose.

## Start Full System

From project root:

```bash
docker compose up --build
```

This starts:

- API Service
- Worker Service
- PostgreSQL
- Redis

---

## Verify Running Containers

```bash
docker ps
```

Expected containers:

```text
cloud-job-api
cloud-job-worker
cloud-job-postgres
cloud-job-redis
```

---

## Apply Prisma Migrations

```bash
docker exec -it cloud-job-api npx prisma migrate deploy
```

---

## Test Health Endpoint

```http
GET http://localhost:3000/health
```

---

## Create Job

```http
POST http://localhost:3000/jobs
```

Example request:

```json
{
  "type": "TEXT_PROCESSING",
  "payload": {
    "text": "Docker compose runs the full system"
  }
}
```

---

## Get Job Result

```http
GET http://localhost:3000/jobs/:id
```

Expected lifecycle:

```text
PENDING → PROCESSING → COMPLETED
```

---

# 🧪 API Testing

Use:

- Postman
- Thunder Client
- curl

---

# 🔥 Current Features

- REST API
- PostgreSQL persistence
- Prisma ORM integration
- Redis queue integration
- BullMQ async processing
- Worker microservice
- TypeScript backend
- Clean architecture
- Queue-based processing
- Background task execution
- Dockerized microservices
- Docker Compose orchestration
- Multi-container architecture
- Container networking

---

# 🚧 Planned Improvements

## Infrastructure

- Kubernetes deployments
- Minikube setup
- CI/CD pipelines
- GitHub Actions

## Reliability

- Retry mechanism
- Dead-letter queue
- Graceful shutdown
- Better error handling

## Scalability

- Multiple worker instances
- Horizontal scaling
- Load balancing

## Monitoring

- Logging system
- Metrics collection
- Queue monitoring

## Security

- Authentication
- Rate limiting
- Secrets management

---

# 📸 Screenshots

Screenshots can be added in:

```text
docs/screenshots/
```

Recommended screenshots:

- POST /jobs success
- GET /jobs result
- Worker processing logs
- Redis container running
- Docker Compose running containers
- Future Kubernetes deployment screenshots

---

# 📚 Engineering Concepts Demonstrated

This project demonstrates:

- Distributed systems
- Asynchronous architecture
- Queue-based communication
- Background processing
- Cloud-native backend design
- Clean architecture patterns
- Microservices separation
- Real-world backend workflow
- Docker containerization
- Multi-container orchestration
- Container networking
- Infrastructure reproducibility

---

# 👨‍💻 Author

Built as a cloud-native backend engineering project for learning modern backend, DevOps, and distributed systems concepts.

---

# 📄 License

MIT License
