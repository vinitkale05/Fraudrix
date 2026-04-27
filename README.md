# Fraudrix AI: Next-Gen Fraud Detection & Forensics

Fraudrix AI is a high-fidelity, enterprise-grade fraud detection platform designed for modern financial institutions. It leverages advanced behavioral analysis and real-time forensics to identify and neutralize sophisticated threats like account takeovers, carding attempts, and money laundering.

![Dashboard Preview](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield-check.svg)

## 🚀 Key Features

### 1. AI Forensics Engine (Quick Investigation)
Instantly generate deep-dive behavioral reports on any suspicious transaction. Our forensics engine analyzes:
- **Velocity Scores**: Detecting rapid-fire transaction patterns.
- **Geospatial Consistency**: Matching IP geolocation against historical user profiles.
- **Behavioral Fingerprinting**: Identifying non-human agents and sophisticated bots.

### 2. Admin Command Center
A centralized hub for platform oversight:
- **Live System Health**: Monitor Database, Compute Engine, and Auth service status.
- **Institution Management**: View and manage registered financial institutions via Supabase integration.
- **Platform Analytics**: Real-time tracking of Fraud Rates, Total Volume, and Saved Revenue.

### 3. Real-Time Alerts Center
A dedicated workspace for security analysts to:
- Review flagged incidents in a high-priority queue.
- Execute instant blocks or dismiss false positives.
- Export forensics reports for audit compliance.

### 4. Dynamic Risk Engine
Calculates risk scores (0-100) based on custom rules and historical deviations, powered by a modular TypeScript backend.

---

## 🛠️ Technology Stack

### Frontend
- **HTML5/Vanilla JS**: Pure performance without framework overhead.
- **Tailwind CSS**: Modern, responsive UI with glassmorphism aesthetics.
- **Material Symbols**: Google's latest iconography for a premium look.

### Backend
- **Node.js & Express**: High-performance API architecture.
- **TypeScript**: Type-safe development for enterprise reliability.
- **MongoDB**: Flexible storage for high-velocity transaction data.
- **Supabase**: Robust authentication and user metadata management.
- **JWT**: Secure session handling for analysts and admins.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Supabase Account (for Auth)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "new project"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   JWT_SECRET=your_jwt_secret
   ```

3. **Frontend Setup**
   The frontend is static. You can serve it using a local server (e.g., Live Server in VS Code) or simply open `frontend/Fraudrix/index.html`.

### Running the Project

1. **Start the Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Launch the Frontend**
   Open `http://localhost:5500/frontend/Fraudrix/index.html` (or your local equivalent).

---

## 📂 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── admin/         # Dashboard stats & institution management
│   │   │   ├── auth/          # Supabase auth integration
│   │   │   └── transactions/  # Core risk logic & forensics
│   │   ├── models/            # Mongoose schemas
│   │   └── index.ts           # Entry point & Simulator
│   └── package.json
├── frontend/
│   └── Fraudrix/
│       ├── index.html         # Landing page
│       ├── dashboard.html     # Analyst Overview
│       ├── alerts.html        # Forensics Hub
│       └── admin-dashboard.html # Platform oversight
└── README.md
```

---

## 🔐 Admin Credentials
For testing purposes, the Admin Command Center uses:
- **Email**: `admin@fraudrix.ai`
- **Password**: `Admin@123`

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
Developed with ❤️ by the Fraudrix AI Team.
