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

<img width="1920" height="1080" alt="Screenshot 1" src="https://github.com/user-attachments/assets/f38064e0-6ab4-4227-b25c-333c90e6bc6e" />
<img width="1920" height="1080" alt="Screenshot 2" src="https://github.com/user-attachments/assets/be83ae1e-3951-431e-a97c-75f599e5100a" />
<img width="1920" height="1080" alt="Screenshot 3" src="https://github.com/user-attachments/assets/8482cb7a-a695-414e-984a-276aefec6b9c" />
<img width="1920" height="1080" alt="Screenshot 4" src="https://github.com/user-attachments/assets/f319b2f3-3772-4740-9f20-27c9969c846a" />
<img width="1920" height="1080" alt="Screenshot 5" src="https://github.com/user-attachments/assets/30992bdf-6bb2-4f65-9062-ebd757f6d57c" />
<img width="1920" height="1080" alt="Screenshot 6" src="https://github.com/user-attachments/assets/64ef07e0-d35b-455a-9869-911ddd9567ad" />
<img width="1920" height="1080" alt="Screenshot 7" src="https://github.com/user-attachments/assets/a965636e-11c9-4017-befb-ba47c67fb217" />
<img width="1920" height="1080" alt="Screenshot 8" src="https://github.com/user-attachments/assets/63c5b66e-cf73-4624-bced-58a78abeb9e5" />
<img width="1920" height="1080" alt="Screenshot 9" src="https://github.com/user-attachments/assets/b77c1d73-958c-4fb5-aa5d-f7cd7db699f8" />
<img width="1920" height="1080" alt="Screenshot 10" src="https://github.com/user-attachments/assets/fe6e5e23-d82f-4213-9cd1-9602d9162813" />
<img width="1920" height="1080" alt="Screenshot 11" src="https://github.com/user-attachments/assets/8f33fa1f-7f58-4b20-be5b-0f8faa2caa79" />
<img width="1920" height="1080" alt="Screenshot 12" src="https://github.com/user-attachments/assets/bf656ff1-f220-4d04-9b3f-b7072ec87f43" />
<img width="1920" height="1080" alt="Screenshot 13" src="https://github.com/user-attachments/assets/f077609d-8aa9-4bb6-8d8d-375497aafa08" />
<img width="1920" height="1080" alt="Screenshot 14" src="https://github.com/user-attachments/assets/c08d95ba-abc2-4d4e-9f1c-b5480adb7f1f" />
<img width="1920" height="1080" alt="Screenshot 15" src="https://github.com/user-attachments/assets/74345630-7d03-4dc6-a933-ad08ffdf51b5" />
<img width="1920" height="1080" alt="Screenshot 16" src="https://github.com/user-attachments/assets/07e37e45-3a53-432f-9180-75bbe6e8542a" />
