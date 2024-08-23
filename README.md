# Video to GIF Converter

A web-based application that converts video files (MP4 and MOV) to GIF format using FFmpeg, built with Next.js, React, and TypeScript.

## Features

- Upload video files (MP4 and MOV)
- Adjust conversion parameters (FPS, resolution, color palette)
- Convert videos to GIF
- Download converted GIFs

## Prerequisites

- Node.js (v14 or later)
- FFmpeg installed and accessible in the system PATH

## Installation

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

1. Click "Choose File" to select a video.
2. Adjust conversion parameters as desired.
3. Click "Convert" to process the video.
4. Once conversion is complete, click "Download GIF" to save the result.

## Architecture

- Frontend: React components manage file upload, parameter adjustment, and download.
- Backend: Next.js API routes handle file conversion using FFmpeg.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- FFmpeg for video processing capabilities
- Next.js team for the fantastic React framework
- All contributors and users of this project

## Contact

Matt - [@mattppal](https://x.com/mattppal)

Project Link: [https://github.com/yourusername/video-to-gif-converter](https://github.com/yourusername/video-to-gif-converter)