import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from 'framer-motion';
import { Upload, FileVideo, Play } from 'lucide-react';

interface FileUploadProps {
    onConversionStart: () => void;
    onConversionComplete: (url: string) => void;
}

const fpsOptions = [10, 12, 15, 20, 25, 30];
const colorOptions = [16, 32, 64, 128];
const resolutionOptions = [240, 360, 480, 720, 1080];

export default function FileUpload({ onConversionStart, onConversionComplete }: FileUploadProps) {
    const [isConverting, setIsConverting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fps, setFps] = useState(15);
    const [resolution, setResolution] = useState(480);
    const [maxColors, setMaxColors] = useState(64);
    const [maxResolution, setMaxResolution] = useState(1080);
    const [originalWidth, setOriginalWidth] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);
    const [isSampleVideo, setIsSampleVideo] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSampleVideo = async () => {
        const response = await fetch('/sample.mp4');
        const blob = await response.blob();
        const file = new File([blob], 'sample.mp4', { type: 'video/mp4' });
        setSelectedFile(file);
        setIsSampleVideo(true);

        // Create a video element to get the correct dimensions of the sample video
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
            setOriginalWidth(video.videoWidth);
            setOriginalHeight(video.videoHeight);
            const maxDimension = Math.max(video.videoWidth, video.videoHeight);
            setMaxResolution(Math.min(1080, maxDimension));
            setResolution(resolutionOptions.find(r => r <= maxDimension) || resolutionOptions[0]);
        };
        video.src = URL.createObjectURL(file);
    };

    useEffect(() => {
        if (selectedFile && !isSampleVideo) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                setOriginalWidth(video.videoWidth);
                setOriginalHeight(video.videoHeight);
                const maxDimension = Math.max(video.videoWidth, video.videoHeight);
                setMaxResolution(Math.min(1080, maxDimension));
                setResolution(resolutionOptions.find(r => r <= maxDimension) || resolutionOptions[0]);
            };
            video.src = URL.createObjectURL(selectedFile);
        }
    }, [selectedFile, isSampleVideo]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
        setIsSampleVideo(false);
    };

    const handleChooseFile = () => {
        fileInputRef.current?.click();
    };

    const handleConvert = async () => {
        if (!selectedFile) return;

        setIsConverting(true);
        onConversionStart();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fps', fps.toString());
        formData.append('resolution', resolution.toString());
        formData.append('maxColors', maxColors.toString());
        formData.append('originalWidth', originalWidth.toString());
        formData.append('originalHeight', originalHeight.toString());

        try {
            const response = await fetch('/api/convert', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Conversion failed');

            const data = await response.json();
            onConversionComplete(data.url);
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex space-x-2">
                <Button
                    onClick={handleChooseFile}
                    variant="outline"
                    className="w-full"
                    disabled={isConverting}
                >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                </Button>
                <Button
                    onClick={handleSampleVideo}
                    variant="outline"
                    className="w-full"
                    disabled={isConverting}
                >
                    <Play className="mr-2 h-4 w-4" />
                    Try a Sample
                </Button>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept="video/*"
                className="hidden"
            />
            {selectedFile && (
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FileVideo className="h-4 w-4" />
                        <span className="truncate">{selectedFile.name}</span>
                    </div>
                    {isSampleVideo && (
                        <video
                            src="/sample.mp4"
                            loop
                            autoPlay
                            muted
                            playsInline
                            className="w-full rounded-lg shadow-md"
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">FPS: {fps}</label>
                        <Slider
                            min={0}
                            max={fpsOptions.length - 1}
                            step={1}
                            value={[fpsOptions.indexOf(fps)]}
                            onValueChange={(value) => setFps(fpsOptions[value[0]])}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Resolution: {resolution}p</label>
                        <Slider
                            min={0}
                            max={resolutionOptions.findIndex(r => r === maxResolution)}
                            step={1}
                            value={[resolutionOptions.indexOf(resolution)]}
                            onValueChange={(value) => setResolution(resolutionOptions[value[0]])}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Max Colors: {maxColors}</label>
                        <Slider
                            min={0}
                            max={colorOptions.length - 1}
                            step={1}
                            value={[colorOptions.indexOf(maxColors)]}
                            onValueChange={(value) => setMaxColors(colorOptions[value[0]])}
                        />
                    </div>
                    <Button
                        onClick={handleConvert}
                        disabled={!selectedFile || isConverting}
                        className="w-full"
                    >
                        Convert
                    </Button>
                </div>
            )}
        </div>
    );
}