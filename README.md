# 🚀 Cloud-Native Job Processing System

A production-style cloud-native distributed platform for asynchronous job processing built with modern backend engineering, DevOps, and observability practices.

This project demonstrates how scalable backend systems are designed and operated in real-world cloud environments using Kubernetes, Redis queues, PostgreSQL persistence, distributed workers, monitoring stacks, and production-grade infrastructure patterns.

---

# 📌 Project Overview

The platform allows clients to:

- Submit jobs through a REST API
- Store jobs in PostgreSQL
- Push jobs into a Redis queue
- Process jobs asynchronously using worker services
- Retry failed jobs automatically
- Move unrecoverable jobs into a Dead Letter Queue (DLQ)
- Monitor system health and metrics in real time
- Visualize infrastructure metrics using Grafana dashboards

The architecture follows real-world distributed backend patterns used in scalable cloud platforms and microservices infrastructures.

---

# 🧠 Real-World Use Cases

This architecture is commonly used for:

- AI inference jobs
- Video processing systems
- PDF generation
- Image optimization
- Email sending systems
- Notification systems
- Report generation
- Data import/export pipelines
- Payment processing
- Background automation systems
- Large-scale asynchronous workloads

Instead of blocking users while heavy tasks execute, the platform processes tasks asynchronously in the background.

---

# 🏗️ System Architecture

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
                              │ Dead Letter Queue│
                              │       (DLQ)      │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │   PostgreSQL     │
                              │   Save Results   │
                              └──────────────────┘



                ┌──────────────────┐
                │   Prometheus     │
                │ Metrics Scraper  │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │     Grafana      │
                │ Monitoring UI    │
                └──────────────────┘
```

---

# ⚙️ Tech Stack

## Backend

- Node.js
- TypeScript
- Express.js

## Queue & Messaging

- Redis
- BullMQ

## Database

- PostgreSQL
- Prisma ORM

## Containerization

- Docker
- Docker Compose

## Orchestration

- Kubernetes
- Minikube

## Observability

- Prometheus
- Grafana
- Pino Logger

## DevOps & Automation

- GitHub Actions
- CI/CD Pipelines

---

# 🔥 Core Features

## ✅ Asynchronous Job Processing

Jobs are processed in the background using distributed workers.

---

## ✅ Redis Queue System

BullMQ + Redis are used for reliable distributed queue communication.

---

## ✅ Worker-Based Architecture

Dedicated worker services process queued jobs independently from the API.

---

## ✅ Dead Letter Queue (DLQ)

Failed jobs that exceed retry limits are automatically moved into a dedicated Dead Letter Queue for debugging and inspection.

---

## ✅ Automatic Retries

Transient failures are automatically retried before being marked as permanently failed.

---

## ✅ Structured Logging

Pino logger is used for production-style structured logs.

Example:

```json
{
  "level": 30,
  "service": "worker-service",
  "msg": "Job completed successfully"
}
```

---

## ✅ Kubernetes Health Checks

The platform uses:

- Liveness probes
- Readiness probes

for self-healing and automatic traffic management.

---

## ✅ Self-Healing Infrastructure

Kubernetes automatically:

- Restarts failed containers
- Replaces unhealthy pods
- Maintains desired state

---

## ✅ Rolling Deployments

Zero-downtime rolling updates are supported through Kubernetes deployments.

---

## ✅ Horizontal Scalability

Worker services can scale horizontally to process jobs concurrently.

---

# 🔍 Observability & Monitoring

The platform includes a production-grade observability stack.

## Monitoring Stack

```text
API / Worker Services
        │
        ▼
 Prometheus Metrics
        │
        ▼
    Grafana Dashboards
```

---

# 📈 Metrics Collected

Examples of collected metrics:

- Total jobs created
- Queue activity
- Worker processing statistics
- Node.js runtime metrics
- API health metrics
- Memory usage
- CPU usage
- Infrastructure metrics

---

# 📊 Grafana Dashboards

Grafana dashboards provide:

- Real-time monitoring
- Historical metric visualization
- Infrastructure dashboards
- Queue activity monitoring
- Job processing trends
- Operational visibility

---

# 🛠️ Prometheus Metrics Endpoint

The API exposes metrics through:

```http
GET /metrics
```

Prometheus automatically scrapes this endpoint every few seconds.

---

# 🧩 Kubernetes Concepts Used

This project demonstrates several important Kubernetes concepts:

- Deployments
- Services
- ConfigMaps
- Secrets
- Namespaces
- Volumes
- Volume Mounts
- Health Probes
- Rolling Updates
- Internal DNS Service Discovery
- Self-Healing Infrastructure

---

# 📂 Project Structure

```text
cloud-job-system/
│
├── api-service/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── worker-service/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── k8s/
│   ├── api-deployment.yaml
│   ├── worker-deployment.yaml
│   ├── postgres-deployment.yaml
│   ├── redis-deployment.yaml
│   ├── prometheus-deployment.yaml
│   ├── grafana-deployment.yaml
│   └── services/
│
├── .github/workflows/
│
└── README.md
```

---

# 🚀 Running the Project

## 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd cloud-job-system
```

---

## 2️⃣ Start Minikube

```bash
minikube start
```

---

## 3️⃣ Build Docker Images

```bash
docker build -t cloud-job-system-api ./api-service

docker build -t cloud-job-system-worker ./worker-service
```

---

## 4️⃣ Load Images Into Minikube

```bash
minikube image load cloud-job-system-api

minikube image load cloud-job-system-worker
```

---

## 5️⃣ Deploy Kubernetes Resources

```bash
kubectl apply -f k8s/
```

---

## 6️⃣ Verify Pods

```bash
kubectl get pods -A
```

---

# 📬 API Endpoints

## Create Job

```http
POST /jobs
```

Example:

```json
{
  "type": "TEXT_PROCESSING",
  "payload": {
    "text": "Hello Cloud Native"
  }
}
```

---

## Get Job By ID

```http
GET /jobs/:id
```

---

## Health Check

```http
GET /health
```

---

## Metrics Endpoint

```http
GET /metrics
```

---

# 📈 Monitoring Access

## Prometheus

```bash
minikube service prometheus-service -n monitoring
```

---

## Grafana

```bash
minikube service grafana-service -n monitoring
```

Default credentials:

```text
username: admin
password: admin
```

---

# 🧪 Reliability Demonstrations

This project demonstrates:

- Worker crash recovery
- Automatic retries
- Dead Letter Queue handling
- Kubernetes self-healing
- Rolling deployments
- Health probe failures
- Real-time monitoring

---

# 📚 Engineering Concepts Demonstrated

This project showcases practical understanding of:

- Distributed systems
- Cloud-native architecture
- Queue-based systems
- Kubernetes orchestration
- Infrastructure observability
- Backend scalability
- Production monitoring
- Reliability engineering
- DevOps workflows
- Platform engineering

---

# 🎯 Future Improvements

Potential future enhancements:

- JWT authentication
- Role-based access control
- Horizontal Pod Autoscaling (HPA)
- Loki log aggregation
- Distributed tracing
- Helm charts
- API Gateway / Ingress
- Rate limiting
- Multi-worker specialization
- Event-driven microservices

---

# 👨‍💻 Author

Developed as a cloud-native backend engineering and DevOps portfolio project demonstrating production-style distributed systems architecture.
