# Project Name

DataGuard Task

## Description

DataGuard Task is a project designed to interact with the GitHub API using serverless functions. Users can filter repositories by language, creation date, and the minimum number of stars. Additionally, users can click on "Add Star" to initiate GitHub authorization, allowing them to return to their previous filtering and scrolling state, making it easy to add stars to the repositories they wish to follow. The application also features a dark theme for an enhanced user experience.

## Environment Variables

Before running the project, create a `.env` file in the root directory with the following content:

```bash
VITE_GITHUB_BASE_API_URL=https://api.github.com
VITE_GITHUB_BASE_URL=https://github.com
VITE_GITHUB_CLIENT_ID=Ov23lic644gCTySHEyfv
VITE_GITHUB_SECRET=8d95d84b98a992f73193c192d105d107e38fee92
```

## Getting Started

```bash
1. git clone https://github.com/AmarSmajlovic/data-guard.git

2. cd data-guard

3. npm install

4. npm run build -- Running npm build instead of npm dev we want to use vercel serverless functions in localhost

5. npm run preview

6. application will run in localhost

```

Also there is deployed version of app: https://data-guard-five.vercel.app/
