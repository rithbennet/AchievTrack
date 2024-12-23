import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('name');

  if (!query || typeof query !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid query parameter' }, { status: 400 });
  }

  try {
    const teachers = await prisma.user.findMany({
      where: {
        AND: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            role: 'Teacher',
          },
        ],
      },
    });

    return NextResponse.json({ teachers }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


