# Video to GIF Converter

A web-based application that converts video files (MP4 and MOV) to GIF format using FFmpeg, built with Next.js, React, and TypeScript.

## Prerequisites

- Node.js (v14 or later)
- FFmpeg installed and accessible in the system PATH

## Installation

### Replit

Just click "Run!"

### Elsewhere

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/video-to-gif-converter.git
   cd video-to-gif-converter
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

## Usage

1. Click "Choose File" to select a video or "Try a Sample" to use a sample video.
2. Adjust conversion parameters (FPS, resolution, max colors) as desired.
3. Click "Convert" to process the video.
4. Once conversion is complete, click "Download GIF" to save the result.

## Architecture

### Frontend

- Built with Next.js and React
- Uses TypeScript for type safety
- Styled with Tailwind CSS and shadcn/ui components
- Main components:
  - `FileUpload`: Handles file selection and parameter adjustments
  - `ConversionProgress`: Displays progress during conversion
  - `DownloadButton`: Manages GIF download

### Backend

- Utilizes Next.js API routes for server-side logic
- Key API routes:
  - `/api/convert`: Handles video to GIF conversion using FFmpeg
  - `/api/serveGif`: Serves the converted GIF files
  - `/api/cleanup`: Removes temporary files after download

### File Conversion Process

1. User uploads a video file or selects the sample video
2. Frontend sends the file and conversion parameters to the backend
3. Backend uses FFmpeg to convert the video to GIF
4. Converted GIF is stored temporarily on the server
5. Frontend provides a download link for the user
6. After download, the temporary file is cleaned up

### Performance Considerations

- Rate limiting implemented to prevent abuse
- Temporary files are cleaned up after download to manage storage
- Conversion parameters allow users to balance quality and file size

## Deployment

The application is configured for deployment on platforms like Vercel or similar services that support Next.js applications.

## Contact

Matt - [@mattppal](https://x.com/mattppal)