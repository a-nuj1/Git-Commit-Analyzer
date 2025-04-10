# 🔍 GitHub User Profile Analyzer

The **GitHub User Profile Analyzer** is a sleek and powerful web application that takes a GitHub username as input and visualizes their public GitHub activity. It helps analyze any developer's profile by fetching their repositories and displaying a commit activity chart.

---

## 📌 Project Description

This tool is designed for developers and recruiters who want to get a quick overview of any GitHub user's coding activity. With a clean UI and fast responses, it lists the user's public repositories and visualizes their recent commit frequency on a daily chart.

---

## 🚀 Features

- 🔎 **GitHub Username Search**  
  Enter any valid GitHub username to get detailed public profile data.

- 📁 **Repositories List**  
  Fetches and displays all public repositories of the user with links and basic info like stars, forks, and description.

- 📈 **Daily Commit Activity Chart** *(Advanced Feature)*  
  A clean, visual representation of how active the user has been in terms of commits over the past few days (using GitHub Events API).

- ⚠️ **Error Handling**  
  Handles invalid usernames and API rate limits gracefully.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js(Vite)
- Tailwind CSS
- Shadcn UI
- TanStack Query/React Query
- lucide-react
- Chart.js (for graphs)
- React Router (for basic routing if applied)

**APIs:**
- GitHub REST API v3

---

## 📸 Screenshots

![alt text](image.png)

---

## 🧪 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/github-user-profile-analyzer.git
cd github-user-profile-analyzer
npm install (install all dependencies)
npm run dev