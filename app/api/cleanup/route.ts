import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();
        const filename = path.basename(url);
        const filePath = path.join(process.cwd(), 'public', 'gifs', filename);

        await unlink(filePath);

        return NextResponse.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Cleanup error:', error);
        return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
    }
}