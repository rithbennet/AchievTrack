import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import { compare } from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  
  pages: {
    signIn: "/sigIn", // Ensure this path is correct
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "abu@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // logic to verify if the user exists
        const existingUser = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(credentials.password as string, existingUser.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role, // Include the role in the user object
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Include the role in the token
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string; // Include the role in the session
      }
      return session;
    },
  },
});