import prisma from '@/libs/prisma';
import { sendPasswordResetEmail } from '@/libs/email';
import crypto from 'crypto';

export async function POST(req, res) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

  const token = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: token,
      resetPasswordTokenExpiry: new Date(resetTokenExpiry),
    },
  });

  await sendPasswordResetEmail(email, token);

  return new Response(JSON.stringify({ message: 'Password reset email sent' }), { status: 200 });
}
