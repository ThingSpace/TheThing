# A Thing 🌱

[Live Demo](https://athing.space/)

A Thing is a thoughtfully crafted, open-source mental health platform that provides a safe, secure, and anonymous environment for individuals to express themselves through journaling, note-taking, and community support. Built with privacy-first principles and designed for accessibility.

## ✨ Features

### 🔒 Privacy & Security First

- **Anonymous Accounts:** No email required - usernames are auto-generated for complete anonymity
- **End-to-End Privacy:** Private journals and notes are fully protected
- **Secure Authentication:** JWT-based auth with bcrypt password hashing
- **Account Recovery:** Skill-testing questions for password recovery without compromising anonymity

### 📝 Expression & Journaling

- **Private & Public Notes:** Write personal thoughts or share publicly with the community
- **Structured Journaling:** Create organized journals with multiple entries
- **Rich Text Support:** Full-featured writing experience with auto-resizing text areas
- **Draft System:** Save and edit your thoughts over time

### 🎨 Personalization

- **11 Beautiful Themes:** Customize your experience with various background patterns
- **Responsive Design:** Seamless experience across desktop and mobile devices
- **Accessibility:** Built with screen readers and keyboard navigation in mind

### 🛡️ Content Moderation

- **AI-Powered Safety:** Automated content review for harmful content
- **Crisis Support Integration:** Automatic detection and resource provision for users in distress
- **Community Guidelines:** Clear rules for maintaining a supportive environment

### 🌍 Global Resources

- **Mental Health Resources:** Curated international crisis support contacts
- **24/7 Helplines:** Quick access to professional help when needed
- **Educational Content:** FAQ section with mental health information

## 🏗️ Technical Architecture

A Thing is built on a modern, type-safe stack that prioritizes performance, security, and developer experience:

### Core Technologies

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router for server-side rendering and optimal performance
- **[TypeScript](https://www.typescriptlang.org/)** - End-to-end type safety throughout the entire application
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid, consistent styling
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and micro-interactions

### Backend & Database

- **[tRPC](https://trpc.io/)** - Type-safe API layer with real-time type inference
- **[Prisma](https://prisma.io/)** - Next-generation ORM with type-safe database access
- **[PostgreSQL](https://postgresql.org/)** - Robust relational database with full ACID compliance
- **[Bun](https://bun.sh/)** - Ultra-fast JavaScript runtime and package manager (preferred over Node.js)

### State Management & UI

- **[Jotai](https://jotai.org/)** - Atomic state management for React
- **[@tanstack/react-query](https://tanstack.com/query/)** - Powerful data fetching and caching
- **[Formik](https://formik.org/)** - Form management with validation
- **[Zod](https://zod.dev/)** - Schema validation for forms and API inputs

### Security & Authentication

- **JWT Tokens** - Secure, stateless authentication
- **bcrypt** - Industry-standard password hashing
- **hCaptcha** - Bot protection for registration
- **Rate Limiting** - API protection against abuse

### Additional Features

- **PWA Ready** - Progressive web app capabilities
- **SEO Optimized** - Meta tags and structured data
- **Analytics Integration** - Cloudflare Analytics support

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **[Bun](https://bun.sh/)** (strongly recommended) or Node.js v18+
- **Git** for cloning the repository
- **PostgreSQL** database (local or hosted)

### Environment Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ThingSpace/TheThing.git
    cd athing
    ```

2. **Install dependencies:**

    ```bash
    bun install
    ```

3. **Environment Variables:**
   Copy `example.env` to `.env` and configure:

    ```bash
    cp example.env .env
    ```

    Required variables:

    ```env
    # Database
    DATABASE_URL="postgresql://user:password@localhost:5432/athing"
    SHADOW_DATABASE_URL="postgresql://user:password@localhost:5432/athing_shadow"

    # Security
    JWT_SECRET="your-super-secure-jwt-secret-key-here"

    # hCaptcha (get from https://hcaptcha.com)
    NEXT_PUBLIC_SITE_KEY="your-hcaptcha-site-key"
    CAPTCHA_SECRET="your-hcaptcha-secret-key"

    # Optional: Cloudflare Analytics
    CLOUDFLARE_ZONE_ID="your-zone-id"
    CLOUDFLARE_API_TOKEN="your-api-token"
    ```

### Database Setup

1. **Create your PostgreSQL databases:**

    ```sql
    CREATE DATABASE athing;
    CREATE DATABASE athing_shadow;
    ```

2. **Generate Prisma client and apply migrations:**

    ```bash
    bun run postinstall
    ```

3. **Push the schema to your database:**
    ```bash
    bunx prisma db push
    ```

### Development

Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `bun run dev`          | Start development server with Turbopack |
| `bun run build`        | Build for production                    |
| `bun run start`        | Start production server                 |
| `bun run lint`         | Run ESLint                              |
| `bun run format`       | Format code with Prettier               |
| `bunx prisma studio`   | Open Prisma Studio database GUI         |
| `bunx prisma db push`  | Push schema changes to database         |
| `bunx prisma generate` | Generate Prisma client                  |

### Development Tips

- **Hot Reload:** Turbopack provides instant hot reload for development
- **Database GUI:** Use Prisma Studio to visualize and edit your data
- **Type Safety:** TypeScript errors will show in your IDE and terminal
- **Code Formatting:** Prettier runs automatically on save (if configured in your editor)

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── (auth)/            # Authentication pages
│   ├── legal/             # Legal documents (Privacy, Terms, etc.)
│   ├── api/trpc/          # tRPC API endpoints
│   └── [pages]/           # Public pages (About, Help, etc.)
├── components/
│   ├── layout/            # Page layouts
│   ├── pages/             # Page-specific components
│   └── ui/                # Reusable UI components
├── server/
│   ├── db/                # Database configuration
│   └── trpc/              # tRPC routers and procedures
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions and helpers
```

## 🔐 Security Features

- **Anonymous by Design:** No personally identifiable information collected
- **Secure Headers:** CSRF, XSS, and other security headers configured
- **Rate Limiting:** API endpoints protected against abuse
- **Input Validation:** All inputs validated with Zod schemas
- **SQL Injection Protection:** Prisma ORM prevents SQL injection
- **Password Security:** bcrypt with proper salt rounds
- **Session Management:** Secure JWT tokens with configurable expiration

## 🌐 Deployment

### Quick Deploy Options

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FThingSpace%2FTheThing)

### Important Runtime Notes

⚠️ **Bun vs Node.js/Yarn:** This project is optimized for **Bun** runtime. If your deployment platform defaults to Node.js/Yarn, you may encounter dependency resolution issues.

**All required dependencies are properly listed in `package.json`, including `@tanstack/react-query`.**

### Environment Setup

1. **Required Environment Variables:**

    ```env
    # Database
    DATABASE_URL="postgresql://user:password@localhost:5432/athing"

    # Security
    JWT_SECRET="your-super-secure-jwt-secret-key-here"

    # hCaptcha (get from https://hcaptcha.com)
    NEXT_PUBLIC_SITE_KEY="your-hcaptcha-site-key"
    CAPTCHA_SECRET="your-hcaptcha-secret-key"

    # Optional: Cloudflare Analytics
    CLOUDFLARE_ZONE_ID="your-zone-id"
    CLOUDFLARE_API_TOKEN="your-api-token"
    ```

### Deployment Methods

#### Docker (Recommended)

```dockerfile
# Multi-stage build for optimal size
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build the application
COPY . .
RUN bun run build

# Production stage
FROM oven/bun:1-slim AS runner
WORKDIR /app

COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static

EXPOSE 3000
CMD ["bun", "server.js"]
```

**Deploy with Docker:**

```bash
docker build -t athing .
docker run -p 3000:3000 athing
```

#### Vercel (Easiest)

1. **Fork this repository**
2. **Connect to Vercel**
3. **Configure environment variables** in Vercel dashboard
4. **Deploy!** - Vercel automatically detects Bun if `bun.lockb` is present

#### Traditional Hosting

**With Bun (Recommended):**

```bash
# Install dependencies
bun install

# Build the application
bun run build

# Start production server
bun run start
```

**With Node.js/npm (Fallback):**

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start production server
npm run start
```

### Platform-Specific Instructions

#### **Vercel**

- ✅ **Automatic Bun detection** if `bun.lockb` is present
- ✅ **Zero-config deployment** from GitHub
- Set environment variables in Vercel dashboard
- Build Command: `bun run build` (auto-detected)
- Start Command: `bun run start` (auto-detected)

#### **Railway**

- Set runtime to Bun in railway.toml or dashboard
- Build Command: `bun run build`
- Start Command: `bun run start`
- Set environment variables in Railway dashboard

#### **Render**

- Set runtime to Bun in render.yaml or dashboard
- Build Command: `bun install && bun run build`
- Start Command: `bun run start`

#### **Dokploy/Self-Hosted**

- Ensure Docker environment supports Bun
- Use provided Dockerfile for containerized deployment
- Configure environment variables in deployment platform

### Deployment Troubleshooting

**Common Issues & Solutions:**

1. **"Module not found: Can't resolve '@tanstack/react-query'"**

    ```bash
    # Verify dependency is installed
    bun add @tanstack/react-query

    # Clear cache and rebuild
    rm -rf .next node_modules
    bun install
    bun run build
    ```

2. **Platform defaulting to Yarn/npm instead of Bun:**
    - Check platform documentation for Bun support
    - Ensure `bun.lockb` file is present in repository
    - Set build/start commands explicitly in platform settings
    - All dependencies are properly listed in package.json for fallback compatibility

3. **Build fails with TypeScript errors:**

    ```bash
    # Check for TypeScript errors
    bun run lint

    # Clear Next.js cache
    rm -rf .next
    bun run build
    ```

4. **Database connection issues:**
    - Verify `DATABASE_URL` environment variable
    - Run database migrations: `bunx prisma db push`
    - Check database server accessibility from deployment platform

5. **Nixpacks/Buildpack Issues:**
    - Ensure all dependencies are in `dependencies` (not `devDependencies`)
    - Use `bun install --production=false` if needed
    - Check buildpack supports Bun runtime

6. **Environment variables not loading:**
    - Verify `.env` file format (no spaces around `=`)
    - Check platform-specific environment variable configuration
    - Ensure sensitive variables are set in deployment platform (not committed)

### Performance & Security Notes

- **Environment Variables:** Never commit sensitive data to repository
- **Database:** Use connection pooling for production databases
- **Assets:** Next.js automatically optimizes images and static assets
- **Caching:** Configure appropriate cache headers for static content
- **Monitoring:** Set up error tracking (Sentry, LogRocket, etc.)

### Scaling Considerations

- **Database:** Consider read replicas for high traffic
- **CDN:** Use CDN for static assets (Vercel handles this automatically)
- **Load Balancing:** Use multiple instances for high availability
- **Database Backups:** Implement regular backup strategy
- **Monitoring:** Set up uptime monitoring and alerting

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure they follow our coding standards
4. **Test thoroughly** - both functionality and accessibility
5. **Write clear commit messages** following conventional commits
6. **Submit a pull request** with a detailed description

### Development Guidelines

- **Code Style:** Use Prettier and ESLint (configured)
- **Type Safety:** Maintain 100% TypeScript coverage
- **Accessibility:** Follow WCAG 2.1 AA guidelines
- **Performance:** Keep lighthouse scores high
- **Security:** Follow OWASP best practices

## 📄 Legal & Privacy

A Thing is committed to user privacy and operates under clear legal guidelines:

- **[Privacy Policy](/legal/privacy-policy)** - How we protect your data
- **[Terms of Service](/legal/terms-of-service)** - Usage guidelines
- **[Acceptable Use](/legal/acceptable-use)** - Community standards
- **[Data Retention](/legal/data-retention)** - How long we keep data

## 🆘 Crisis Resources

If you're in immediate danger or having thoughts of self-harm:

- **US:** National Suicide Prevention Lifeline: 988
- **UK:** Samaritans: 116 123
- **Canada:** Talk Suicide Canada: 1-833-456-4566
- **Global:** More resources available in the app at `/resources`

## 📊 Statistics

Visit `/stats` to see real-time platform statistics including user activity and community metrics.

## 🙏 Acknowledgments

- Built with love for the mental health community
- Inspired by the need for anonymous, safe spaces online
- Thanks to all contributors and the open-source community

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/ThingSpace/TheThing/issues)
- **Documentation:** This README and inline code comments
- **Community:** Join our discussions in GitHub Discussions
- **Discord:** Join our [Discord Server](https://discord.gg/C3ZuXPP7Hc)

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

**Remember:** You matter, your thoughts are valid, and you're not alone. 💚
