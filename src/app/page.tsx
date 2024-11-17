// src/app/page.tsx
import LoginForm from "@/components/form/LoginForm";
import styles from "./styles/login.module.scss"; // Import the SCSS file

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <LoginForm />
    </main>
  );
}
