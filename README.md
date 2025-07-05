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

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with Turbopack |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run format` | Format code with Prettier |
| `bunx prisma studio` | Open Prisma Studio database GUI |
| `bunx prisma db push` | Push schema changes to database |
| `bunx prisma generate` | Generate Prisma client |

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

### Important Notes

⚠️ **Bun vs Node.js/Yarn:** This project is optimized for Bun. If your deployment platform uses Node.js/Yarn by default, you may encounter dependency resolution issues. Ensure `@tanstack/react-query` is properly installed.

### Docker (Recommended)

```dockerfile
# Build and run with Docker
docker build -t athing .
docker run -p 3000:3000 athing
```

### Vercel (Easiest)

1. Fork this repository
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Traditional Hosting

```bash
bun run build
bun run start
```

### Deployment Troubleshooting

**Common Issues:**

1. **Missing `@tanstack/react-query` dependency:**
   ```bash
   bun add @tanstack/react-query
   ```

2. **Build fails with "Module not found":**
   - Ensure all dependencies are installed: `bun install`
   - Clear build cache: `rm -rf .next && bun run build`

3. **Database connection issues:**
   - Verify `DATABASE_URL` is correctly set
   - Run `bunx prisma db push` to sync schema

4. **Platform using Yarn instead of Bun:**
   - Check if platform supports Bun runtime
   - Ensure `package.json` has all required dependencies
   - Consider using `package-lock.json` for Node.js compatibility

5. **Nixpacks/Docker build issues:**
   - Ensure `@tanstack/react-query` is in dependencies (not devDependencies)
   - Use `bun install --production=false` to install all dependencies
   - Clear build cache and rebuild

6. **Environment variables not loading:**
   - Check `.env` file format (no spaces around `=`)
   - Verify platform-specific environment variable setup
   - Ensure sensitive variables are properly configured in deployment platform

### Platform-Specific Notes

**Vercel:**
- Automatically detects Bun if `bun.lockb` is present
- Environment variables set in dashboard
- Runs build commands automatically

**Railway/Render:**
- May default to Node.js - check runtime settings
- Ensure build command uses `bun run build`
- Set start command to `bun run start`

**Docker:**
- Use multi-stage builds for smaller images
- Install dependencies in separate layer for better caching
- Ensure production environment variables are set
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
