import NextAuth from 'next-auth';
import { authOptions } from '@/libs/authOptions'; // Adjust the path if necessary

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };