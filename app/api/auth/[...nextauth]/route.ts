import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

// ✅ Define it once
export const authOptions: AuthOptions = {
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

        if (!user) throw new Error("Invalid email");

        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

// ✅ Export the handler for NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
