import { NextRequest } from "next/server";
import { z } from "zod";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { schema } from "../../schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error: any) {
    console.error('Error creating issue:', error);

    return NextResponse.json(
      { error: 'An unexpected error occurred while creating the issue.' },
      { status: 500 }
    );
  }
}