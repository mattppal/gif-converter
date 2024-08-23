import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const filePath = path.join(process.cwd(), 'public', 'gifs', ...params.path);

    try {
        const data = await readFile(filePath);
        return new NextResponse(data, {
            headers: {
                'Content-Type': 'image/gif',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error(`Error serving GIF: ${filePath}`, error);
        return new NextResponse('GIF not found', { status: 404 });
    }
}