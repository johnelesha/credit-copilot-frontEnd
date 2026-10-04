# Credit Copilot Lite – Frontend

React + Vite + TypeScript + Tailwind UI for the underwriting API.

## Run

1. Backend must be running on http://localhost:3000
2. Copy `.env.example` to `.env` (`VITE_API_URL=http://localhost:3000`)
3. `npm install`
4. `npm run dev` → http://localhost:5173

## Demo accounts

- credit_officer / credit123
- senior_officer / senior123

## Pages
- `/login` – JWT login
- `/ask` – policy Q&A + citations / refusal
- `/assess` – run pipeline, rules, steps, approve/reject

## Note
Backend must be seeded (`seed:policy`, `seed:applications`, `seed:users`) before using Assess.