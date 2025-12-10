## Short description

A modern web application for browsing, uploading, and managing sheet music. Built with React, TypeScript, and Vite, featuring user authentication, advanced filtering capabilities, PDF viewing, and a responsive dark/light theme interface.

## ✨ Features

- User Authentication - Secure registration and login system
- Sheet Music Library - Browse, upload, and manage your personal collection
- Advanced Filtering - Search by genre, difficulty level, and instrument
- PDF Viewer - Integrated PDF viewing with react-pdf
- User Profiles - Manage your account and favorites
- Theme Support - Light and dark mode with seamless switching
- Responsive Design - Optimized for all screen sizes
- Favorites System - Save and organize your favorite sheet music

## 🛠️ Technologies Used

- Framework: React 19 with TypeScript
- Build Tool: Vite 6
- UI Library: Chakra UI v3
- Routing: React Router v7
- HTTP Client: Axios
- PDF Rendering: react-pdf & pdfjs-dist
- Icons: Lucide React
- Animations: Framer Motion
- State Management: React Context API
- Theming: next-themes

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 📦 Installation

1. Clone the repository

```bash
git clone https://github.com/andrejkoller/notorium-frontend.git
cd notorium-frontend
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

The application will be available at http://localhost:5173 (or another port if 5173 is in use).

## 🔌 API Integration

The application communicates with a backend API through the axios instance configured in `src/services/axios-instance.ts`.

Key Features:

- Automatic JWT token injection from localStorage
- Automatic redirect to login on 401 (Unauthorized)
- Centralized error handling

Services:

- `auth-service.ts` - Authentication (login, register)
- `user-service.ts` - User management
- `sheet-music-service.ts` - Sheet Music CRUD operations

## 🔐 Authentication

The app uses JWT-based authentication:

1. User logs in via `/login`
2. JWT token is stored in localStorage
3. Token is automatically included in API requests
4. Protected routes redirect to login if token is missing/invalid

## 🔗 Related

- Backend Repository: [Notorium API](https://github.com/andrejkoller/NotoriumAPI)

## 📸 Screenshots

<img width="1920" height="1080" alt="Screenshot 1" src="https://github.com/user-attachments/assets/b8f4a1d1-7d5f-4617-9361-3c9c0df4b45e" />
<img width="1920" height="1080" alt="Screenshot 2" src="https://github.com/user-attachments/assets/496e65cd-236d-4151-98b8-0b44b17f915b" />
<img width="1920" height="1080" alt="Screenshot 3" src="https://github.com/user-attachments/assets/fa2e95b1-ea49-421d-bd22-cb9e5e05fb0b" />
<img width="1920" height="1080" alt="Screenshot 4" src="https://github.com/user-attachments/assets/26ce6b95-174a-4f6d-aa28-a72e2ebc97ce" />
