// src/app/page.tsx
import LoginForm from "@/app/components2/form/LoginForm";
import styles from "./styles/login.module.scss"; // Import the SCSS file

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <LoginForm />
    </main>
  );
}
