import prisma from "@/lib/prisma";
import { UserType } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { object, string, ValidationError } from "yup";

export async function POST(req: Request) {
  try {
    const credentials = await loginUserValidator().validate(await req.json());
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findFirst({
        where: { email: credentials.email },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User does not exists" },
          { status: 404 }
        );
      }

      const isPasswordValid = bcrypt.compareSync(
        credentials.password,
        user.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Invalid user credentials" },
          { status: 401 }
        );
      }

      if (user.type === UserType.customer) {
        return NextResponse.json(
          { message: "You are not allowed to login from here" },
          { status: 400 }
        );
      }

      const accessToken = generateAccessToken(user.id);
      cookies().set("session", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

      return NextResponse.json({ accessToken }, { status: 200 });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET ?? "secret", {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY ?? 72000,
  });
};

const loginUserValidator = () => {
  return object({
    email: string().trim().email().required(),
    password: string().trim().required(),
  });
};
