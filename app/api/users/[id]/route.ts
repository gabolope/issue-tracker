import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id: id } });

  if (!user)
    return NextResponse.json({ error: "Invalid user" }, { status: 404 });

  await prisma.user.delete({ where: { id: id } });

  return NextResponse.json({});
}
