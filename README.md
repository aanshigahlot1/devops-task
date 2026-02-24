# MEAN Stack Application (Dockerized with CI/CD)

A full-stack **MEAN (MongoDB, Express.js, Angular, Node.js)** application deployed using **Docker**, **Docker Compose**, **GitHub Actions CI/CD**, and **Nginx Reverse Proxy** on an Ubuntu cloud VM.

## **Key Highlights:**

**Containerization:** Full orchestration using Docker Compose.

**Automation:** CI/CD pipeline for automated testing, building, and deployment.

**Cloud Hosting:** Scalable deployment on AWS EC2 (Ubuntu).
 
**Routing:** Nginx configured as a reverse proxy for seamless frontend/backend integration.

---

# 📦 Prerequisites

Install the following tools:

- Git
- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose
- Node.js (optional for local development)
- GitHub Account
- Docker Hub Account
- Cloud VM (AWS EC2 / Azure / GCP)

---

# ⚙️ Step 1 — Clone Repository


   ```bash
   git clone https://github.com/aanshigahlot1/devops-task.git
   cd devops-task
   ```
# 🐳 Step 2 — Docker Setup (Local Machine)
## Build Backend Image
 ```bash
docker build -t mean-backend ./backend
```
## Build Frontend Image
```bash
docker build -t mean-frontend ./frontend
```
# 🧱 Step 3 — Docker Compose Setup
Create docker-compose.yml in root folder:
```yaml
version: "3"

services:
  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"

  backend:
    image: aanshi0108/mean-backend
    container_name: backend
    ports:
      - "8080:8080"
    depends_on:
      - mongo

  frontend:
    image: aanshi0108/mean-frontend
    container_name: frontend
    ports:
      - "4200:80"
    depends_on:
      - backend
```
Run containers:
```bash
docker compose up -d
```
Check running containers:
```bash
docker ps
```
# 🌐 Step 4 — Verify Application Locally
Frontend:
```bash
http://localhost:4200
```
Backend API:
```bash
http://localhost:8080/api/tutorials
```
# 📤 Step 5 — Push Images to Docker Hub
Login:
```bash
docker login
```
Tag images:
```bash
docker tag mean-backend aanshi0108/mean-backend
docker tag mean-frontend aanshi0108/mean-frontend
```
Push images:
```bash
docker push aanshi0108/mean-backend
docker push aanshi0108/mean-frontend
```
# ☁️ Step 6 — Cloud VM Setup (AWS EC2 Ubuntu)
## Launch VM
1. OS: Ubuntu
2. Allow ports: 22, 80, 8080, 4200

Connect via SSH:
```bash
ssh -i mean-key.pem ubuntu@<EC2_PUBLIC_IP>
```
## Install Docker
```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
```
## Install Docker Compose
```bash
sudo apt install docker-compose -y
```
Check version:
```bash
docker-compose --version
```
## Deploy Application on VM
```bash
git clone <your-repository-link>
cd <project-folder>
docker-compose pull
docker-compose up -d
```
Check Containers:
```bash
docker ps
```
Access app:
```bash
http://<EC2_PUBLIC_IP>:4200
```
# 🔁 Step 7 — Nginx Reverse Proxy Setup
Install Nginx:
```bash
sudo apt install nginx -y
```
Edit config:
```bash
sudo nano /etc/nginx/sites-available/default
```
Example config:
```Nginx
server {
    listen 80;

    location / {
        proxy_pass http://localhost:4200;
    }

    location /api {
        proxy_pass http://localhost:8080;
    }
}
```
Restart Nginx:
```bash
sudo systemctl restart nginx
```
Now application runs on:
```bash
http://<EC2_PUBLIC_IP>
```
# 🚀 Step 8 — CI/CD Pipeline (GitHub Actions)
Create folder:
```bash
.github/workflows/
```
Create file:
```bash 
ci-cd.yml
```
Example workflow:
```YAML

name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Docker Login
        run: docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}

      - name: Build Backend
        run: docker build -t aanshi0108/mean-backend ./backend

      - name: Build Frontend
        run: docker build -t aanshi0108/mean-frontend ./frontend

      - name: Push Images
        run: |
          docker push aanshi0108/mean-backend
          docker push aanshi0108/mean-frontend
```

## Add GitHub Secrets
Go to:
```code
Repository → Settings → Secrets → Actions
```
Add:
**1.** DOCKER_USERNAME
**2.** DOCKER_PASSWORD

# Project Structure
```bash
project-root/
│
├── backend/
│   └── Dockerfile
│
├── frontend/
│   └── Dockerfile
│
├── docker-compose.yml
├── .github/workflows/ci-cd.yml
└── README.md
```
---
# Application Features:

- Full CRUD operations for tutorials
- Add, Update, Delete tutorials
- Search tutorials by title
- REST API integration using Angular HTTPClient
- MongoDB database persistence
- Dockerized services
- CI/CD automated deployment
- Nginx reverse proxy configuration
---

# Challenges Faced:
## 🧠 Challenges Faced

- Docker compose compatibility issue (`ContainerConfig` error)
- Nginx port conflict with Docker container
- MongoDB connection buffering timeout
- Angular build serving default nginx page

### Solutions

- Rebuilt Docker images cleanly
- Corrected nginx proxy configuration
- Updated MongoDB connection string
- Fixed Angular dist folder path
---
# 🚀 Future Improvements

- Add HTTPS using SSL certificates
- Domain mapping with Route53
- Kubernetes deployment
- Auto-scaling setup
- Monitoring using Prometheus & Grafana
---
# 📜 License

This project is created for DevOps assignment and educational purposes.












