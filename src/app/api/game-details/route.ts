import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   return new Response("wow");
// }

export async function GET(request: NextRequest) {
  return NextResponse.json({
    hello: "world",
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  return new Response(JSON.stringify({ Hello: "World" }));
}
