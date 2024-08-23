'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";

export default function ConversionProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + Math.random() * 5;
                return newProgress >= 100 ? 100 : newProgress;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-4">
            <motion.p
                className="text-sm font-medium text-center text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Converting...
            </motion.p>
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Progress value={progress} className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        style={{ width: `${progress}%` }}
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </Progress>
            </motion.div>
        </div>
    );
}