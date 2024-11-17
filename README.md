## First Pull Instructions

When you first pull this repository, follow these steps to set up your development environment:

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Set up the database**:
    - Ensure you have a PostgreSQL database running.
    - Create a `.env` file in the root of your project and add your database URL:
        ```env
        DATABASE_URL="your-database-url"
        ```
    - Run Prisma migrations to set up your database schema:
        ```bash
        npx prisma migrate dev
        ```

3. **Run the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Sass**: A preprocessor scripting language that is interpreted or compiled into CSS. It allows you to use variables, nested rules, mixins, functions, and more, all with a fully CSS-compatible syntax.
- **Bootstrap**: A powerful, feature-packed frontend toolkit. Build anything—from prototype to production—in minutes.
- **Prisma**: An open-source database toolkit that makes it easy to work with databases in TypeScript and JavaScript applications. It provides type-safe database access and migrations.
- **Supabase**: Supabase is an open-source backend-as-a-service (BaaS) that provides a suite of tools to help developers build and scale their applications.
- **zod**: Zod is a TypeScript-first schema declaration and validation library. It allows you to define schemas for your data and provides a simple and powerful API for validating that data. Zod is particularly useful for ensuring that the data your application receives and processes conforms to expected formats and types, reducing the risk of runtime errors and improving overall code reliability.
- **bcrypt**: bcrypt is a library for hashing passwords. It is designed to be computationally intensive to make brute-force attacks more difficult. bcrypt provides functions to hash passwords and to compare hashed passwords with plain text passwords. This makes it an essential tool for securely storing and verifying user passwords in applications, ensuring that even if the password database is compromised, the actual passwords remain protected.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
