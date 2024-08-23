'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface DownloadButtonProps {
    url: string | null;
    onDownloadComplete: () => void;
}

export default function DownloadButton({ url, onDownloadComplete }: DownloadButtonProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    if (!url) return null;

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            // Fetch the file
            const response = await fetch(url);
            const blob = await response.blob();

            // Create a temporary URL for the blob
            const blobUrl = window.URL.createObjectURL(blob);

            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `converted-gif-${Date.now()}.gif`; // Set the filename

            // Append to the document, click it, and remove it
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Revoke the blob URL
            window.URL.revokeObjectURL(blobUrl);

            // Trigger cleanup
            await fetch('/api/cleanup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            onDownloadComplete();
        } catch (error) {
            console.error('Error during download:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Button onClick={handleDownload} className="w-full" disabled={isDownloading}>
            <Download className="mr-2 h-4 w-4" />
            {isDownloading ? 'Downloading...' : 'Download GIF'}
        </Button>
    );
}