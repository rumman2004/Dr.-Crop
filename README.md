# 🌿 Dr. Crop

**Dr. Crop** is a modern, AI-powered web application designed for intelligent crop disease diagnosis. It leverages advanced AI models to analyze crop images, helping farmers, agronomists, and agriculture enthusiasts identify plant health issues quickly and accurately.

---

## ✨ Features

- **🤖 AI-Powered Diagnosis:** Utilizes Google Gemini and OpenAI to analyze uploaded crop images and provide detailed health assessments.
- **☁️ Cloud Image Storage:** Secure image uploading and management via Cloudinary.
- **🎨 Modern & Responsive UI:** Built with React 19, Tailwind CSS v4, and GSAP for beautiful, smooth animations across all devices.
- **⚡ Robust Backend API:** Express.js RESTful API connected to MongoDB for securely storing user scan history and diagnosis results.
- **🛡️ Secure & Optimized:** Implements best practices with Helmet, CORS, and Morgan for security and request logging.

---

## 🛠️ Technology Stack

### Client (Frontend)
- **Framework:** React 19 with Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP
- **Icons:** Lucide React
- **Language:** TypeScript

### Server (Backend)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Image Hosting:** Cloudinary
- **AI Integrations:** `@google/genai` (Gemini), `openai`
- **File Uploads:** Multer

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas cluster)
- **Cloudinary Account** (for image storage)
- **Gemini API Key** and/or **OpenAI API Key** (for AI diagnosis)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Dr. Crop"
```

### 2. Setup the Server

Navigate to the `Server` directory and install the dependencies:

```bash
cd Server
npm install
```

Create a `.env` file in the `Server` directory based on the provided `.env.example`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=dr_crop
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_FOLDER=dr-crop/scans
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

### 3. Setup the Client

Open a new terminal window, navigate to the `Client` directory, and install the dependencies:

```bash
cd Client
npm install
```

---

## 🏃‍♂️ Running Locally

To run the application locally, you will need to start both the frontend client and the backend server.

**Terminal 1 (Backend Server):**
```bash
cd Server
npm run dev
```
*The server will start running on `http://localhost:5000`.*

**Terminal 2 (Frontend Client):**
```bash
cd Client
npm run dev
```
*The client will start running on `http://localhost:5173`.*

Open your browser and navigate to `http://localhost:5173` to view the application.

---

## 📂 Folder Structure

```text
Dr. Crop/
├── Client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components (Home, Studio, History, etc.)
│   │   ├── services/       # API call definitions
│   │   └── ...
│   └── package.json
└── Server/                 # Backend Express API
    ├── config/             # Database and environment configurations
    ├── controller/         # Request handling logic
    ├── middleware/         # Custom Express middlewares (e.g., error handling)
    ├── models/             # Mongoose database schemas
    ├── routes/             # API endpoint definitions
    ├── services/           # AI and Cloudinary integration logic
    └── server.js           # Application entry point
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **ISC License**.
