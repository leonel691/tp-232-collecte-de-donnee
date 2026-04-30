# MindCampus

Application full-stack de collecte et d'analyse de la santé mentale des étudiants.

## Structure

- `frontend`: Next.js 14 + TypeScript + Tailwind + React Hook Form + Zod + Recharts
- `backend`: Express + Node.js + TypeScript + MongoDB/Mongoose + Zod

## Lancement local

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

## Variables d'environnement

### backend/.env

- `PORT`
- `MONGODB_URI`
- `ADMIN_PASSWORD`
- `FRONTEND_URL`

### frontend/.env.local

- `NEXT_PUBLIC_API_BASE_URL`
