import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password || password.length < 8) {
    return NextResponse.json(
      { error: 'E-Mail und Passwort (mind. 8 Zeichen) erforderlich.' },
      { status: 400 }
    );
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json(
      { error: 'Ein Konto mit dieser E-Mail existiert bereits.' },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email, password: hashed },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
