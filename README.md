# React Hook Form – Vite

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-success)

---

## 📄 Description

**React Hook Form – Vite** is a **modern React form handling project** built using **React Hook Form** and **Vite**.  
The project demonstrates **efficient form validation**, **minimal re-renders**, and **clean form state management** using React Hook Form’s hook-based API.

Vite is used as the build tool for **fast development**, **instant hot module replacement**, and **optimized production builds**.

This project serves as a **learning reference and starter template** for building scalable, performant forms in React.

---

## Table of Contents

- [Preview](#preview)
- [Screenshot](#Screenshot)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Build](#build)
- [Deployment](#deployment)
- [License](#license)

---

## Preview

**Live Demo:**  
🔗 https://react-hook-form-vite.netlify.app/

---

## Screenshot
![React-hook-form-vite](https://github.com/NishaVijai/react-hook-form-vite/assets/26595961/6c07c6de-bd64-4fa7-9699-5fcb0c25cee7)

---

## Features

- 📝 **Form Handling with React Hook Form**
- ✅ **Client-Side Validation**
- ⚡ **Fast Development with Vite**
- 🔁 **Minimal Re-Renders**
- 🧩 **Reusable and Scalable Components**
- 🎯 **Clean & Simple UI**
- 🚀 **Production-Ready Build**

---

## Technologies Used

- **React** – Component-based UI library
- **React Hook Form** – Performant form management
- **Vite** – Next-generation frontend build tool
- **JavaScript (ES6+)**
- **CSS** – Styling
- **Netlify** – Hosting & CI/CD

---

## Installation

To run this project locally:

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd react-hook-form-vite
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

### 4️⃣ Open in browser

```text
http://localhost:5173
```

---

## Usage

* Fill in the form fields
* Submit to trigger validation
* Error messages appear instantly for invalid inputs
* Valid data is handled efficiently with React Hook Form

---

## Project Structure

```
react-hook-form-vite/
│
├── public/                 # Static assets
├── src/
│   ├── components/         # Form components
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Vite entry point
│   └── index.css           # Global styles
│
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## Build

To create a production build, run:

```bash
npm run build
```

This command:

* Optimizes the application
* Generates a `dist/` folder
* Prepares the app for deployment

---

## Deployment

This project is hosted on **Netlify** using **GitHub continuous deployment**.

### Netlify Build Settings

| Setting               | Value           |
| --------------------- | --------------- |
| **Build Command**     | `npm run build` |
| **Publish Directory** | `dist`          |

### Deploying Updates

Simply push changes to the `main` branch:

```bash
git add .
git commit -m "Update project"
git push origin main
```

✅ Netlify will automatically build and deploy the latest version.

---

## License

This project is **open source** and available for personal or educational use.
