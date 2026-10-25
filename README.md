# 🏥 ArogyaCare

### AI-Powered Digital Healthcare Platform

ArogyaCare is a digital healthcare platform designed to make essential healthcare services more accessible, connected, and convenient for patients, doctors, and pharmacies.

The platform brings together **teleconsultation, AI-assisted healthcare support, medicine discovery, digital health records, and role-based dashboards** in one ecosystem.

> **Goal:** Make healthcare easier to access, easier to manage, and more connected for users.
> 
Live Link - https://arogya-care-onmw.vercel.app/
>
> 
---

## ✨ Key Features

### 👨‍⚕️ Teleconsultation
Connect patients with doctors through online consultations using real-time communication.

### 🤖 AI Doctor
AI-powered assistance for common health-related queries and guidance, designed to help users understand their concerns before taking the next appropriate step.

### 💊 Medicine Search
Search for medicines and related information through medicine data integrations.

### 🩺 Digital Health Records
Keep important health information and records organised digitally for easier access and management.

### 👨‍⚕️ Doctor Dashboard
A dedicated workspace for doctors to manage consultations and patient-related information.

### 🏪 Pharmacy Dashboard
A dedicated interface for pharmacy-side workflows and medicine-related management.

### 📱 Mobile OTP Authentication
User authentication using mobile number and OTP-based verification.

### 📴 Offline-First Approach
Designed with an offline-first mindset so essential workflows can continue in low-connectivity environments and sync when connectivity is restored.

### 📡 Real-Time Communication
WebRTC-based communication can support low-bandwidth teleconsultation scenarios.

---

## 🧠 Healthcare Integrations

ArogyaCare is designed around healthcare-focused integrations such as:

- **RxNav API** — medicine name/search data
- **ABDM** — digital health ecosystem integration
- **FHIR** — structured health-data interoperability
- **ABHA ID** — support for digital health identity workflows
- **NMC Registry** — doctor/medical professional verification workflows
- **AWS S3** — cloud storage for supported files/media
- **Google AI Studio** — AI-powered healthcare assistance

> Integration availability depends on the environment, API configuration, and current project implementation.

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend & Services
- Node.js
- Express.js
- REST APIs
- WebRTC

### Authentication & Data
- JWT
- SQLite / local storage for offline workflows
- PostgreSQL / cloud database services where configured

### AI / Healthcare
- AI-assisted conversational features
- RxNav
- ABDM / FHIR
- NMC Registry

### Storage & Infrastructure
- AWS S3
- Git & GitHub

---

## 🏗️ High-Level Architecture

```text
                        ┌──────────────────────┐
                        │      ArogyaCare      │
                        │   Web Application    │
                        └──────────┬───────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
       │   Patients  │      │   Doctors   │      │  Pharmacies │
       └──────┬──────┘      └──────┬──────┘      └──────┬──────┘
              │                    │                    │
              └────────────────────┼────────────────────┘
                                   ▼
                        ┌──────────────────────┐
                        │   Application APIs   │
                        └──────────┬───────────┘
                                   │
             ┌─────────────────────┼──────────────────────┐
             │                     │                      │
             ▼                     ▼                      ▼
      ┌────────────┐       ┌─────────────┐       ┌─────────────┐
      │ AI Services│       │ Health Data │       │ File Storage│
      │            │       │ / FHIR /    │       │    (S3)     │
      │            │       │    ABDM     │       │             │
      └────────────┘       └─────────────┘       └─────────────┘
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Harsh10172005/ArogyaCare.git
cd ArogyaCare
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and add the credentials required by the services enabled in your local setup.

Example:

```env
# Authentication
JWT_SECRET=your_jwt_secret

# AI
GOOGLE_AI_API_KEY=your_api_key

# Database
DATABASE_URL=your_database_url

# Storage
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket

# Healthcare / External APIs
RXNAV_BASE_URL=your_rxnav_endpoint
FHIR_BASE_URL=your_fhir_endpoint
ABDM_BASE_URL=your_abdm_endpoint
```

> Do not commit secrets, API keys, certificates, or private credentials to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown by your development server.

> Check the repository's `package.json` for the exact scripts and any additional setup requirements used by the current version.

---

## 🔐 Security & Privacy

Healthcare applications handle sensitive information. ArogyaCare is designed with security and responsible data handling in mind.

Key considerations include:

- Secure authentication and authorization
- Protected API credentials through environment variables
- Role-based access for patients, doctors, and pharmacies
- Controlled access to health records
- Secure file storage workflows
- Safe handling of health-related information

---

## 🎯 Use Cases

### Patients
- Find medicines
- Access health records
- Connect with doctors
- Get AI-assisted health guidance
- Manage healthcare information

### Doctors
- Manage consultations
- Access relevant patient information
- Use a dedicated doctor dashboard
- Communicate with patients remotely

### Pharmacies
- Manage medicine-related workflows
- Support patients with medicine availability and information

---

## 🌍 Vision

ArogyaCare aims to contribute toward a more connected healthcare experience by bringing patients, doctors, pharmacies, and digital health services onto one platform.

The long-term vision is to make healthcare:

**Accessible • Connected • Affordable • Digital**

---

## ⚠️ Medical Disclaimer

ArogyaCare is a technology project and should not be considered a replacement for professional medical advice, diagnosis, or treatment.

AI-assisted responses are for informational/support purposes only. Users should consult a qualified healthcare professional for medical decisions, emergencies, or serious symptoms.

---

## 📌 Project Status

🚧 **Actively developed / project prototype**

Features and integrations may evolve as the platform continues to be developed and tested.

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Open a Pull Request

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

---

## 👨‍💻 Author

**Harsh Pathak**

GitHub: [@Harsh10172005](https://github.com/Harsh10172005)

Repository: [ArogyaCare](https://github.com/Harsh10172005/ArogyaCare)

---

## ⭐ Support

If you find ArogyaCare interesting, consider giving the repository a ⭐ on GitHub.

**Built with ❤️ to make healthcare more accessible through technology.**
