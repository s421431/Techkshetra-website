import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req, res) {
  const { token, password } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ message: 'Token is invalid or expired' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    },
  });

  return new Response(JSON.stringify({ message: 'Password has been reset' }), { status: 200 });
}
