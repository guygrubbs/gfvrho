
# **gfvrho: Startup Pitch Submission and VC Insights Platform**

## **Overview**

**gfvrho** is a platform designed to bridge the gap between **startups** and **venture capitalists (VCs)**. Startups can submit pitch decks and business information, while VCs can generate tailored investment reports and track startup growth over time.

### **Key Features**
- Pitch Deck Submission
- Tiered Report Generation
- VC Dashboard for Business Insights
- Integration with LLMs (ChatGPT, Perplexity)
- Secure Payment Processing via Stripe

---

## **Table of Contents**
1. [Project Structure](#project-structure)
2. [Tech Stack](#tech-stack)
3. [Local Development Setup](#local-development-setup)
4. [Production Deployment](#production-deployment)
5. [API Documentation](#api-documentation)
6. [Testing](#testing)
7. [Environment Variables](#environment-variables)
8. [Contribution Guidelines](#contribution-guidelines)
9. [License](#license)

---

## **1. Project Structure**

```
gfvrho/
├── backend/       # Backend API (Flask, Python)
├── frontend/      # Frontend Application (React, TailwindCSS)
├── infrastructure/ # AWS Infrastructure (CDK)
├── .github/       # CI/CD Workflows
├── docker-compose.yml # Local deployment configuration
└── README.md      # Documentation
```

---

## **2. Tech Stack**

### **Frontend:**
- React.js
- Tailwind CSS
- Axios

### **Backend:**
- Python (Flask)
- SQLAlchemy (PostgreSQL)
- LangChain (for LLM integration)
- Stripe API (for payments)

### **Infrastructure:**
- AWS ECS (Fargate)
- AWS S3 (Frontend hosting)
- AWS RDS (PostgreSQL Database)
- AWS CloudFront (CDN)
- AWS CDK (Infrastructure as Code)

### **CI/CD:**
- GitHub Actions
- AWS CodePipeline

---

## **3. Local Development Setup**

### **Prerequisites:**
- Node.js (v18+)
- Python (v3.9+)
- Docker & Docker Compose
- AWS CLI
- Git

### **Step 1: Clone Repository**
```bash
git clone https://github.com/your-username/gfvrho.git
cd gfvrho
```

### **Step 2: Set Up Environment Variables**
Copy the sample `.env` file and update the variables:
```bash
cp .env.example .env
```

### **Step 3: Start Backend and Frontend Services**
```bash
docker-compose up --build
```

### **Step 4: Access the Application**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## **4. Production Deployment**

### **Using AWS Infrastructure:**
1. Ensure AWS CLI is configured:
   ```bash
   aws configure
   ```
2. Deploy infrastructure:
   ```bash
   cd infrastructure/cdk
   cdk deploy
   ```
3. Build and deploy frontend and backend:
   ```bash
   ./infrastructure/scripts/build.sh all
   ./infrastructure/scripts/deploy.sh all
   ```

---

## **5. API Documentation**

### **Base URL:**
- Local: `http://localhost:5000/api`
- Production: `https://api.gfvrho.com`

### **Endpoints**

#### **Authentication:**
| Method | Endpoint          | Description      |
|--------|--------------------|------------------|
| POST   | `/api/auth/login`  | User login      |
| POST   | `/api/auth/signup` | User signup     |

#### **Reports:**
| Method | Endpoint              | Description             |
|--------|------------------------|--------------------------|
| POST   | `/api/reports/create`  | Create a new report     |
| GET    | `/api/reports`         | Fetch user reports      |

#### **Users:**
| Method | Endpoint          | Description             |
|--------|--------------------|--------------------------|
| GET    | `/api/users/me`    | Fetch user profile      |
| PATCH  | `/api/users/me`    | Update user profile     |

Full API documentation (Swagger/OpenAPI) will be added in future updates.

---

## **6. Testing**

### **Frontend Testing:**
```bash
cd frontend
npm run test
```

### **Backend Testing:**
```bash
cd backend
pytest
```

### **Infrastructure Validation:**
```bash
cd infrastructure/cdk
npx cdk synth
```

---

## **7. Environment Variables**

Update the `.env` file with the following:

### **Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### **Backend (.env)**
```env
DATABASE_URL=postgresql://user:password@localhost/db
STRIPE_SECRET_KEY=sk_test_xxx
AWS_REGION=us-east-1
```

---

## **8. Contribution Guidelines**

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make changes and commit:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push changes to your fork:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a Pull Request.

---

## **9. License**

This project is licensed under the **MIT License**.

---

## **10. Support**
- **Email:** support@gfvrho.com

---

## **11. Roadmap**
- Add Swagger/OpenAPI documentation.
- Enable advanced analytics dashboards for VCs.

---

Thank you for using **gfvrho**!
