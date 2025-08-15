// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User"; // your User model
import { dbConnect } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials?.email });
        if (!user || !(await bcrypt.compare(credentials!.password, user.password))) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // 👈 attach MongoDB _id to token
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // 👈 attach id to session
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
  signIn: "/auth/signin",
  newUser: "/auth/signup", // 👈 ensures new users get routed to Sign Up
},

  secret: process.env.NEXTAUTH_SECRET,
};
