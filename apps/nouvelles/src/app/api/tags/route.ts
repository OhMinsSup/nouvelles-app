import { NextResponse } from 'next/server';
import { tagsService } from '~/server/tags/tags.server';

export async function GET() {
  try {
    const data = await tagsService.findMany();
    return NextResponse.json({
      ok: true,
      items: data,
      error: null,
    });
  } catch (error) {
    const data = JSON.stringify({
      ok: false,
      items: [],
      error: {
        code: 'server_error',
        message: 'Internal server error',
      },
    });
    return new Response(data, { status: 400 });
  }
}
