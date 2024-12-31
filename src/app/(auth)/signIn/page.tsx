// src/app/page.tsx
import LoginForm from "@/components/signIn/LoginForm";
import styles from "../../styles/login.module.scss"; // Import the SCSS file
import { SessionProvider } from "next-auth/react";

export default async function LoginPage() {

  return (
    <main className={styles.page}>
      <SessionProvider>
        <LoginForm />
      </SessionProvider>
    </main>
  );
}
