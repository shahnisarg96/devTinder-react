# DevTinder (Frontend)

A modern, developer-focused social connection platform inspired by Tinder, built with React, Redux Toolkit, Vite, and Tailwind CSS. DevTinder allows developers to connect, send and receive requests, manage connections, and maintain a profile—all with a clean, responsive UI.

---

## 🚀 Features

- **Authentication:**  
  Sign up and login with secure session management (API-based, cookie credentials).
- **Feed:**  
  Swipe-style feed to discover and connect with other developers.
- **Send Requests:**  
  Express interest or ignore users directly from the feed.
- **Requests Management:**  
  View incoming connection requests and accept or decline them.
- **Sent Requests:**  
  Track requests you have sent to others.
- **Connections:**  
  See your established connections and message them.
- **Profile Management:**  
  Edit your profile, including name, age, gender, and profile picture.
- **Global State Management:**  
  Redux Toolkit for user, feed, requests, and connections.
- **Responsive UI:**  
  Built with Tailwind CSS and DaisyUI for a modern, mobile-friendly experience.
- **Notifications:**  
  Toast messages for actions like profile updates and connection requests.
- **Routing:**  
  Client-side routing with React Router v7.
- **Vite:**  
  Fast development, HMR, and optimized builds.
- **Code Quality:**  
  ESLint with recommended rules and React Hooks best practices.

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router v7](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)

---

## 📁 Project Structure

```
devTinder-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Body.jsx
│   │   ├── Connections.jsx
│   │   ├── Feed.jsx
│   │   ├── Footer.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── Profile.jsx
│   │   ├── Requests.jsx
│   │   ├── Sent.jsx
│   │   ├── Toast.jsx
│   │   └── UserCard.jsx
│   └── utils/
│       ├── appStore.js
│       ├── connectionSlice.js
│       ├── constants.js
│       ├── feedSlice.js
│       ├── requestSlice.js
│       └── userSlice.js
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── .gitignore
```

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```
   git clone <repo-url>
   cd devTinder-frontend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the development server:**
   ```
   npm run dev
   ```
   The app will run at [http://localhost:5173](http://localhost:5173) by default.

4. **API Backend:**
   - This frontend expects a backend API (not included here) with endpoints for authentication, feed, connections, requests, and profile management.
   - Update `BASE_URL` in [`src/utils/constants.js`](src/utils/constants.js) if your API base path differs.

---

## 🧩 Key Concepts & Code Highlights

- **Redux Store:**  
  Centralized state for user, feed, requests, and connections ([`src/utils/appStore.js`](src/utils/appStore.js)).
- **Slices:**  
  Modular Redux slices for each domain (user, feed, connection, request).
- **Authentication:**  
  Login and signup handled in [`src/components/Login.jsx`](src/components/Login.jsx), with session persisted via cookies.
- **Feed & UserCard:**  
  Swipe-style feed with actions ([`Feed.jsx`](src/components/Feed.jsx), [`UserCard.jsx`](src/components/UserCard.jsx)).
- **Requests & Connections:**  
  Manage incoming/outgoing requests and established connections ([`Requests.jsx`](src/components/Requests.jsx), [`Sent.jsx`](src/components/Sent.jsx), [`Connections.jsx`](src/components/Connections.jsx)).
- **Profile:**  
  Edit and update your profile ([`Profile.jsx`](src/components/Profile.jsx)).
- **UI:**  
  Tailwind CSS and DaisyUI for styling, responsive layouts, and components.
- **Notifications:**  
  Toast component for user feedback ([`Toast.jsx`](src/components/Toast.jsx)).
- **Routing:**  
  All navigation handled with React Router v7 ([`App.jsx`](src/App.jsx), [`Body.jsx`](src/components/Body.jsx)).
- **Code Quality:**  
  ESLint config for React and hooks ([`eslint.config.js`](eslint.config.js)).

---

## 📝 Notes

- This project is for educational/demo purposes and is not intended for production use.
- You must provide a compatible backend API for full functionality.
- Profile pictures can be set via URL or will use a generated avatar as fallback.
- All API requests use `credentials: 'include'` for session management.

---

## 📚 References

- [Namaste React](https://namastedev.com/learn/namaste-react)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [DaisyUI Documentation](https://daisyui.com/)
- [Vite Documentation](https://vitejs.dev/)

---

## 👨‍💻 Author

Inspired by: **Akshay Saini**  
Project by: **Nisarg Shah**