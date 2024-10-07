import { NextRequest } from "next/server";
import { z } from "zod";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/prisma/client";

const schema=z.object({
    title:z.string().min(1).max(255),
    description:z.string().min(1),
})

export async function POST(req:NextRequest) {
    const body=await req.json();
    const validation=schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description },
      });
    
      return NextResponse.json(newIssue, { status: 201 });
}