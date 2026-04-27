# Product Requirements Document (PRD): Fraudrix AI

**Project Name:** Fraudrix AI  
**Version:** 1.0.0  
**Status:** Frontend Complete | Backend Planning  
**Date:** April 26, 2026  



## 4. Backend Requirements (Proposed)
The backend must be built for high availability, low latency, and massive scale.

### 4.1. Core API Services
- **Language**: Node.js (TypeScript) or Python (FastAPI).
- **Architecture**: Microservices-based to separate "Ingestion" from "Analysis."
- **Auth**: JWT-based session management with MFA support.
- **Database**:
    - **Primary**: **mongodb** (Document store for flexible transaction schemas).
    - **Cache/Session**: **Redis** (For rate-limiting, hot-swappable rules, and session management).

### 4.2. Real-time Ingestion Layer
- **Technology**: Apache Kafka or RabbitMQ.
- **Purpose**: Buffer incoming transaction streams before processing.
- **Latency Target**: < 5ms ingestion delay.

### 4.3. Data Storage
- **Relational (supabase)**: User accounts, rule configurations, and audit logs.
- **Document Store (mongodb)**: Massive transaction history and raw payloads for forensics.
- **Cache (Redis)**: Storing active session fingerprints and "Hot Rules" for instant lookup.

### 4.4. AI/ML Engine
- **Framework**: Python-based (Scikit-learn, TensorFlow, or PyTorch).
- **Service**: FastAPI wrapper for model inference.
- **Features**:
  - Behavioral Profiling (comparing current TX to user history).
  - Velocity Checks (frequency of transactions).
  - Geographic Impossible Travel detection.

### 4.5. Real-time Communication
- **WebSockets (Socket.io)**: Pushing live transaction updates and alerts to the frontend without polling.

---

## 5. Security & Compliance
- **Encryption**: AES-256 for data at rest; TLS 1.3 for data in transit.
- **Compliance Ready**: Architectural support for PCI DSS, GDPR, and SOC2.
- **Anonymization**: PII (Personally Identifiable Information) masking in analyst views.

---

## 6. Development Roadmap
- **Phase 1 (Complete)**: UI/UX design and Frontend Prototyping.
- **Phase 2 (Current)**: Backend API development and Database schema setup.
- **Phase 3**: ML Model training and integration with the Rule Engine.
- **Phase 4**: Real-time WebSocket integration and Stress Testing.

---

## 7. Success Metrics
- **False Positive Rate**: < 1.5%
- **Detection Rate**: > 99% for known fraud patterns.
- **Inference Latency**: < 20ms total round-trip.
