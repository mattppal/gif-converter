'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from '@/components/FileUpload';
import ConversionProgress from '@/components/ConversionProgress';
import DownloadButton from '@/components/DownloadButton';
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleConversionStart = () => setIsConverting(true);
  const handleConversionComplete = (url: string) => {
    setDownloadUrl(url);
    setIsConverting(false);
  };

  const handleDownloadComplete = () => {
    setDownloadUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              📸 vid2gif
            </h1>
            <FileUpload
              onConversionStart={handleConversionStart}
              onConversionComplete={handleConversionComplete}
            />
            <AnimatePresence mode="wait">
              {isConverting ? (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ConversionProgress />
                </motion.div>
              ) : downloadUrl ? (
                <motion.div
                  key="download"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <DownloadButton
                    url={downloadUrl}
                    onDownloadComplete={handleDownloadComplete}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
      <footer className="mt-8 text-center text-gray-600">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://x.com/mattppal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Matt
          </a>
        </p>
      </footer>
    </div>
  );
}
