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


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
