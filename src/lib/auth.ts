import { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { CustomSessionUser } from "@/types/user.types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface CustomSession extends DefaultSession {
  user: CustomSessionUser;
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        console.log("reached google bro");
        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
        });
        console.log(existingUser);

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: profile?.email as string,
              username: profile?.name as string,
              googleId: profile?.sub as string,
            },
          });
          console.log(newUser);
          token.id = newUser.id;
        } else {
          console.log("existing user");
          token.id = existingUser.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      const newSession: CustomSession = session as CustomSession;
      if (newSession.user) {
        newSession.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
