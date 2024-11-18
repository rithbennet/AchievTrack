// src/app/LoginForm.tsx
"use client";
import { useState } from "react";
import styles from "@/app/styles/login.module.scss"; // Import the SCSS file

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Logged in with email: ${email}`);
  };

  return (
    <div className={styles.container}>
      {/* Left Part (Logo and Title) */}
      <div className={styles.left}>
        <img src="/logo.png" alt="School Logo" className={styles.logo} />
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}