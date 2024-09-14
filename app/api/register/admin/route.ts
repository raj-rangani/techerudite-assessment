import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { object, string, ValidationError } from "yup";

export async function POST(req: Request) {
  try {
    const body = await registerUserValidator().validate(await req.json());
    const hashedPassword = bcrypt.hashSync(
      body.password,
      +(process.env.PASSWORD_SALT_ROUNDS ?? 3)
    );

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          type: "admin",
          email: body.email,
          password: hashedPassword,
          lastName: body.lastName,
          firstName: body.firstName,
        },
        select: {
          id: true,
          type: true,
          email: true,
          lastName: true,
          firstName: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({ user }, { status: 201 });
    });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: `${error.meta?.modelName} already added with this email` },
        { status: 400 }
      );
    } else if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}

const registerUserValidator = () => {
  return object({
    firstName: string().trim().required(),
    lastName: string().trim().required(),
    email: string().trim().email().required(),
    password: string().trim().required(),
  });
};
