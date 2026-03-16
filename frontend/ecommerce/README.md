# E-Commerce Next.js Application

A full-stack e-commerce application built with **Next.js**, **React**, **TypeScript**, **Prisma**, **PostgreSQL**, and **Mantine UI Components**.

## Tech Stack

- **Frontend**: Next.js 15+ with Turbopack, React, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **UI Library**: Mantine UI Components
- **Authentication**: NextAuth
- **Styling**: Mantine CSS, PostCSS
- **Real-time Features**: Socket.io support
- **Admin Features**: Rich text editor, data charts, and admin dashboard

## Prerequisites

- **Node.js** 18+ and npm/yarn
- **Docker** and **Docker Compose**
- **Git**

## Quick Start

Follow these steps to set up and run the project locally:

### 1. Start Docker Services

```bash
docker compose up -d
```

This starts the PostgreSQL database and any other required services.

### 2. Install Dependencies

```bash
npm i -f
```

The `-f` flag forces installation and resolves any dependency conflicts.

*** create .env file here is the sample u can use as it is
``` bash

BETTER_AUTH_SECRET=11Iyv9ssbui5XjV2mDItRRleRgPEw1au
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND=http://localhost:3000

DATABASE_URL=postgresql://user:pass123@127.0.0.1:5432/testdb
GOOGLE_CLIENT_SECRET=XXXXXXXXXX
GOGGLE_CLIENT_ID=XXXXXXXXXXXXXXXX

NEXT_PUBLIC_API_URL=https://api.loomandlume.shop/api
# NEXT_PRIVATE_DEBUG_CACHE=1

```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

This generates the Prisma Client based on your schema defined in `prisma/schema.prisma`.

### 4. Push Database Schema

```bash
npx prisma db push
```

This command migrates your database schema. Use this for development.

> **Note**: This is a quick migration tool for development. For production, consider using `prisma migrate`.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint and fix issues
```

## Project Structure

```
frontend/ecommerce/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (customer)/        # Customer routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── header/           # Header component
│   │   ├── footer/           # Footer component
│   │   ├── adminSidebar/     # Admin sidebar
│   │   ├── productCard/      # Product display card
│   │   ├── FilterButton/     # Filter controls
│   │   └── ...
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # Authentication setup
│   │   ├── prisma.ts         # Prisma client
│   │   └── apiFetch.ts       # API fetch utilities
│   ├── utils/                # Helper functions
│   ├── constants/            # Constants and types
│   └── prisma/               # Prisma schema and migrations
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript configuration
```

## Database Setup

The application uses **Prisma** as the ORM with **PostgreSQL**.

### View/Edit Database Schema

```bash
# Open Prisma Studio to view/edit data visually
npx prisma studio
```

### Push Schema Changes

```bash
npx prisma db push
```

### Create Migration (Production)

```bash
npx prisma migrate dev --name <migration_name>
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

## Features

### Customer Features
- Product browsing and search
- Shopping cart management
- Order placement and tracking
- User authentication

### Admin Features
- Product management
- Order management
- Admin dashboard with analytics
- Rich text editor for product descriptions
- Data visualization and charts

## Development Tips

- **Hot Reload**: Changes are automatically reflected with Turbopack
- **Type Safety**: Full TypeScript support for better development experience
- **Mantine UI**: Pre-built components for faster UI development
- **Prisma Studio**: Visual database management tool

## Troubleshooting

### Database Connection Issues
```bash
# Verify database is running
docker ps

# Check database logs
docker logs <container_name>
```

### Prisma Issues
```bash
# Clear Prisma cache and regenerate
rm -rf node_modules/.prisma
npx prisma generate
```

### Dependencies Issues
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm i -f
```

## Build for Production

```bash
npm run build
npm start
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

This project is private and not licensed for public use.

## Support

For issues or questions, please create an issue in the repository.
