import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const tokenRecord = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!tokenRecord || tokenRecord.expires < new Date()) {
    return NextResponse.json({ error: 'Token is invalid or has expired.' }, { status: 400 });
  }

  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({ where: { token } });

  const baseUrl = process.env.NEXTAUTH_URL;
  return NextResponse.redirect(`${baseUrl}/auth/signin`);
}
