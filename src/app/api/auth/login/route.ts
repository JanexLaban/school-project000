import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import bcrypt from 'bcrypt';
import { z } from 'zod';

// Input validation schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    
    const db = await open({
      filename: path.join(process.cwd(), 'data', 'hospital.db'),
      driver: sqlite3.Database
    });

    const user = await db.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    await db.close();

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare password with hashed password in database
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
