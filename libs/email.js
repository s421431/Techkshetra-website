import { randomBytes } from 'crypto';
import { createTransport } from 'nodemailer';
import prisma from '@/libs/prisma';

export async function sendPasswordResetEmail(email, token) {
  const transporter = createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${token}`;

  const logoUrl = `https://ik.imagekit.io/uahycsra15/logos/logowithbackground`;

  await transporter.sendMail({
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
        <div style="margin: 20px;">
          <img src="${logoUrl}" alt="TechKshetra logo" style="width: 150px; border-radius: 50%;"/>
        </div>
        <h1 style="font-size: 24px; color: #000;">Reset Your Password</h1>
        <p style="font-size: 16px; color: #555;">Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="text-decoration: none; color: #1a73e8;">${resetUrl}</a>
      </div>
    `,
  });
}

export async function sendVerificationEmail(email) {
  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000); // 1 hour

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  const transporter = createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}&email=${email}`;

  const logoUrl = `https://ik.imagekit.io/uahycsra15/logos/logowithbackground`;

  await transporter.sendMail({
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: 'Welcome to TechKshetra',
    html: `
      <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
        <div style="margin: 20px;">
          <img src="${logoUrl}" alt="TechKshetra logo" style="width: 150px; border-radius: 50%;"/>
        </div>
        <h1 style="font-size: 24px; color: #000;">Welcome to TechKshetra</h1>
        <p style="font-size: 16px; color: #555;">CS and IT Club</p>
        <p style="font-size: 16px; color: #555;">Click the following link to verify your email:</p>
        <p><a href="${verificationUrl}" style="text-decoration: none; color: #1a73e8;">${verificationUrl}</a></p>
      </div>
    `,
  });
}
