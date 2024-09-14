import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const token = cookies().get("session");
    console.log(token?.value);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = jwt.verify(
      token?.value ?? "",
      process.env.ACCESS_TOKEN_SECRET ?? "secret"
    );

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: (decodedToken as any).userId },
      });

      return NextResponse.json({ user }, { status: 200 });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else if (error instanceof JsonWebTokenError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
  }
}
