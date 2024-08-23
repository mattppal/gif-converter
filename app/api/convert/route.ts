import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const tempDir = path.join(process.cwd(), 'public', 'gifs');

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const fps = parseInt(formData.get('fps') as string) || 15;
        const resolution = parseInt(formData.get('resolution') as string) || 480;
        const maxColors = parseInt(formData.get('maxColors') as string) || 256;
        const originalWidth = parseInt(formData.get('originalWidth') as string);
        const originalHeight = parseInt(formData.get('originalHeight') as string);

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        await mkdir(tempDir, { recursive: true });

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}.gif`;
        const inputPath = path.join(tempDir, `${filename}.mp4`);
        const outputPath = path.join(tempDir, filename);

        await writeFile(inputPath, buffer);

        // Calculate new dimensions while maintaining aspect ratio
        const aspectRatio = originalWidth / originalHeight;
        let newWidth = resolution;
        let newHeight = Math.round(newWidth / aspectRatio);

        if (newHeight > resolution) {
            newHeight = resolution;
            newWidth = Math.round(newHeight * aspectRatio);
        }

        // Updated FFmpeg command to maintain exact aspect ratio
        const ffmpegCommand = `ffmpeg -i ${inputPath} -vf "fps=${fps},scale=${newWidth}:${newHeight}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=${maxColors}[p];[s1][p]paletteuse" -loop 0 ${outputPath}`;

        console.log('Executing FFmpeg command:', ffmpegCommand);
        const { stdout, stderr } = await execAsync(ffmpegCommand);
        console.log('FFmpeg stdout:', stdout);
        console.log('FFmpeg stderr:', stderr);

        // Clean up the temporary input file
        await unlink(inputPath);

        const gifUrl = `/gifs/${filename}`;

        return NextResponse.json({ url: gifUrl });
    } catch (error) {
        console.error('Conversion error:', error);
        return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
    }
}