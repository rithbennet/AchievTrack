// src/app/LoginForm.tsx
"use client";
import { useForm } from "react-hook-form";
import styles from "@/app/styles/login.module.scss"; // Import the SCSS file
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email("Invalid email"),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.role === "Admin") {
      router.push("/admin"); // Navigate to the admin page
    } else if (session?.user?.role === "Teacher") {
      router.push("/teacher"); // Navigate to the teacher page
    }
  }, [session, router]);

  const onSubmit = async (data: FormSchemaType) => {
    // Handle sign-in logic here
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        setLoginError("Invalid email or password.");
      } else {
        setLoginError(result.error);
      }
    } else {
      console.log("Logged in successfully");
      if (session?.user?.role === "Admin") {
        router.push("/admin"); // Navigate to the admin page
      } else if (session?.user?.role === "Teacher") {
        router.push("/teacher"); // Navigate to the teacher page
      } else {
        router.push("/"); // Default fallback
      }
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}