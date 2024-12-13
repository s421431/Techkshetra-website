import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            userType: true,
            studentId: true,
            emailVerified: true,
          },
        });

        if (user) {
          if (!user.emailVerified) {
            throw new Error('Email not verified');
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return user;
          } else {
            throw new Error('Invalid password');
          }
        } else {
          throw new Error('User does not exist');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
        session.user.id = token.id;
        session.user.emailVerified = token.emailVerified;
        session.user.userType = token.userType;
        session.user.studentId = token.studentId;
        session.user.image = token.image || session.user.image;  // Include profile picture
        return session;
      },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;
        token.userType = user.userType;
        token.studentId = user.studentId;
        token.image = user.image;  // Store profile picture URL in the token
      }
      return token;
    },      
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request', // Verification page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };