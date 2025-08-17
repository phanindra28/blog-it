# BlogIt

BlogIt is a modern blogging platform built with React and Firebase, designed for fast, interactive, and secure blog creation and sharing.

## Features

- User authentication (Firebase)
- Create, edit, and delete blog posts
- Responsive UI with Vite and React
- Loading indicators and smooth navigation
- Modular component structure

## Tech Stack

- React
- Vite
- Firebase
- CSS Modules

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Firebase:**
   - Update `src/config/firebase.js` with your Firebase project credentials.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

- `src/components/` – Reusable UI components
- `src/pages/` – Page-level components (Home, Blog, CreateBlog, Login, etc.)
- `src/config/` – Firebase configuration
- `src/hooks/` – Custom React hooks
- `src/routes/` – App routing
