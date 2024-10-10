import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db.js";

export async function POST(request) {
  try {
    const data = await request.json();

    const userEmailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userEmailFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    if (usernameFound) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashPassword,
      },
    });

    return NextResponse.json(`User ${data.username} registered.`);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
