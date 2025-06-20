# A Thing

[Live Demo](https://athing.codemeapixel.dev/)

A Thing is an open-source platform designed to provide a safe, secure, and anonymous environment for individuals to express themselves through journaling, ranting, venting, or offering support to others.

## Why A Thing?

In a world where mental health struggles are common and personal experiences often go unspoken, A Thing aims to provide a voice. It's built on the belief that everyone deserves a space to share their thoughts and feelings without judgment. Key features include:

- **Private & Public Notes:** Write personal notes or share them publicly to connect with a wider community.
- **Journaling:** Create journals and entries, with options for public or private visibility.
- **Customization:** Personalize your experience with various themes for both the application and your journals.
- **Type-Safety:** Built on the T3 Stack, ensuring end-to-end type safety for robust and reliable development.

## Architecture

A Thing is built on top of the [T3 Stack](https://create.t3.gg/). The T3 Stack is a modern web development stack that emphasizes type-safety, performance, and developer experience. It includes:

- **Next.js:** A React framework for building server-rendered React applications with features like routing, API routes, and optimized performance.
- **TypeScript:** A superset of JavaScript that adds static typing, enabling end-to-end type safety throughout the application. This is crucial for catching errors early and improving code maintainability.
- **Tailwind CSS:** A utility-first CSS framework that allows for rapid UI development by composing classes directly in your JSX.
- **tRPC:** A type-safe RPC (Remote Procedure Call) framework that allows you to build end-to-end type-safe APIs without the need for GraphQL or REST. It enables seamless communication between your Next.js frontend and backend.
- **NextAuth.js:** A flexible authentication library for Next.js applications, providing support for various authentication providers and strategies.
- **Prisma:** A next-generation ORM (Object-Relational Mapper) that simplifies database access and management with a type-safe API.

## Getting Started

To run A Thing locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- **Node.js:** (LTS version recommended)
- **Yarn:** A fast, reliable, and secure dependency management tool for JavaScript.
- **Git:** For cloning the repository.

### Environment Variables

Create a `.env` file in the root of the project based on the `.env.example` file. This file will contain your database connection string and other sensitive information.

### Database Setup

A Thing uses Prisma for database management. You'll need a PostgreSQL database.

1.  **Set up your database:** Ensure your PostgreSQL database is running and accessible.
2.  **Update `.env`:** Add your database connection URL to the `DATABASE_URL` variable in your `.env` file.
    ```
    DATABASE_URL="postgresql://user:password@host:port/database"
    ```
3.  **Run Migrations:** Apply the Prisma migrations to your database:
    ```bash
    yarn run dev:migrate:postgres
    ```

### Installation and Running

1.  **Clone the repository:**
    ```bash
    git clone <repo_link>
    cd a-thing
    ```
2.  **Install dependencies:**
    ```bash
    yarn install
    ```
3.  **Start the development server:**
    ```bash
    yarn run dev
    ```

The application should now be running on `http://localhost:3000`.

### Available Commands

Here's a quick overview of the custom commands available in `package.json`:

- `yarn run dev` - Runs the development server
- `yarn run build` - Builds the project. I've added `prisma migrate deploy` to deploy the database migrations before the build starts just to be sure in the prod/dev that my migrations are deployed. You can remove it if you don't want to use Prisma.
- `yarn run postinstall` - Runs the `prisma generate` command after the `yarn install` command. This is to ensure that the Prisma Client is generated after the install command is run. You can also remove this if you don't want to use Prisma or run `npx prisma generate` after the `yarn install` command which is the same thing.
- `yarn run lint` - Runs ESLint on the project.
- `yarn run start` - Runs the production server. This is the command that is run on the server. It runs the `yarn run build` command before starting the server.
- `yarn run dev:migrate:postgres` - Runs the `prisma migrate dev` command. This is to ensure that the migrations are deployed in the development environment (NOT PRODUCTION; REFER TO `prisma migrate deploy`).
- `yarn run dev:studio` - Runs the Prisma Studio (with the development database from `.env.devlopment`).

## Contributing

We welcome contributions to A Thing! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and ensure they adhere to the project's coding standards.
4.  Write clear, concise commit messages.
5.  Submit a pull request with a detailed description of your changes.

Please ensure your code is type-safe and well-tested.

## License

This project is licensed under the [MIT License](LICENSE.md).
