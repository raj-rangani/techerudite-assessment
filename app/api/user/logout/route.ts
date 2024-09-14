import { cookies } from "next/headers";

export async function POST(req: Request) {
  cookies().delete("session");
  return new Response(null, { status: 204 });
}
