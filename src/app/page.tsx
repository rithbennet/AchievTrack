// src/app/page.tsx
"use client";
import { useState } from "react";
import styles from "./styles/login.module.scss"; // Import the SCSS file

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Logged in with email: ${email}`);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Left Part (Logo and Title) */}
        <div className={styles.left}>
          <img src="/logo.png" alt="School Logo" className={styles.logo} />
          {/* <h1 className={styles.title}>SK Saujana Utama</h1> */}
          <h1 className={styles.title} style={{ color: "black" }}>SK SAUJANA UTAMA</h1>
        </div>

        {/* Right Part (Form) */}
        <div className={styles.right}>
          <div className={`card shadow-sm p-4 ${styles.formCard}`}>
            <h2 className="text-center mb-4">LOGIN</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              <a href="#" className="text-decoration-none">Forgot password?</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
