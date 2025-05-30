# ⚡ React + Vite + TypeScript Shopping App

A modern, performant web app built using **Vite**, **React**, and **TypeScript**, featuring **TailwindCSS** for styling and **Recoil** for state management. This project includes custom UI components, icon components, modular layouts, and structured data flow using atoms and selectors.

---

## 🚀 Tech Stack

| Technology                                    | Purpose                      |
| --------------------------------------------- | ---------------------------- |
| [Vite](https://vitejs.dev/)                   | Fast build tool & dev server |
| [React](https://reactjs.org/)                 | Frontend UI library          |
| [TypeScript](https://www.typescriptlang.org/) | Type safety & better DX      |
| [TailwindCSS](https://tailwindcss.com/)       | Utility-first CSS framework  |
| [Recoil](https://recoiljs.org/)               | State management for React   |
| [Axios](https://axios-http.com/)              | HTTP requests to backend     |

---

## 📁 Folder Structure Overview

```
src/
│
├── assets/                   # Images, SVGs, logos
├── components/               # Reusable UI and icon components
│   ├── icons/                # contains icons used in project as components
│   ├── ui/                   # UI components like : cards, searchbar, takeToTopButton etc. 
│
├── layouts/                  # Page-level layouts (e.g., Dashboard, Checkout)
├── store/                    # Global state atoms and selectors
│   ├── atomsAndSelectors/    # Recoil atoms and selectors [derived from atoms]
│   ├── loaclStorage.ts       # LocalStorage helpers
│
├── types/                    # Shared TypeScript interfaces
│   ├── interfaces/           # this contains the item.ts file which have interfaces  e.g. `apiItems`, `cardItems`
│
├── App.tsx                   # Main app component
├── main.tsx                  # Vite + React entry point
```

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AJbeetle/GroceryShoppingDashboard
cd GroceryShoppingDashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
VITE_BACKEND_BASE_URL=http://localhost:5000
```

> ⚠️ Replace with your actual backend URL or API.

---

## 💻 Run the App

```bash
npm run dev
```

This will start the Vite dev server at `http://localhost:5173`.

---

## 🔧 Features

* ✅ Fast reload & build using Vite
* ✅ Responsive UI with TailwindCSS
* ✅ Modular codebase with layouts and components
* ✅ Type-safe state and props via TypeScript
* ✅ Persistent state (localStorage + Recoil)
* ✅ Clean separation of concerns using atoms and selectors
* ✅ Robust cart/like/recommendation logic

---

## 🤝 Contributing

Feel free to fork and submit a pull request. 

---

## 📦 Build for Production

```bash
npm run build
```

The final static files will be available in the `dist/` folder.

---

## 📝 License

AAYUSHI JOSHI - 2025

---

## 📈 Feedback

If you find bugs or have suggestions, feel free to open an issue or start a discussion.

Enjoy hacking! ✨

# UI SNIPPETS 

## Dashboard 
![Dashboard](https://github.com/user-attachments/assets/b642abc2-e4de-46aa-8209-5755e4004bfe)



## Search Functionality
![Search Functionality](https://github.com/user-attachments/assets/f6bf805b-af5c-401d-a8e3-6eb8b02c59d5)



## offers, stock displayed in UI + backToTop button
![offers, stock displayed in UI + backToTop button](https://github.com/user-attachments/assets/6deb26e1-1a1f-4d69-a377-dd0623b8060e)



## Cart Items
![Cart Items](https://github.com/user-attachments/assets/935a5efc-d944-4985-8cac-979ade163422)

