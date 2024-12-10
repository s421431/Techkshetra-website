import prisma from '@/libs/prisma';
import { hashPassword } from '@/libs/auth';
import { sendVerificationEmail } from '@/libs/email';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, password, userType, studentId } = await req.json();
    console.log('Received data:', { name, email, password, userType, studentId });

    const hashedPassword = await hashPassword(password);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json({ error: 'User already exists with the same email.' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userType,
        studentId: userType === 'student' ? studentId : null,
      },
    });

    await sendVerificationEmail(user.email);
    console.log('User created and email sent:', email);

    return NextResponse.json({ message: 'Please verify your email.' });

  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: 'Signup failed. Please try again later.' }, { status: 500 });
  }
}
