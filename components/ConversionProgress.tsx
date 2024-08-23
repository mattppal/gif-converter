'use client';

import { Progress } from "@/components/ui/progress";

export default function ConversionProgress() {
    return (
        <div className="space-y-2">
            <p className="text-sm font-medium text-center text-gray-600">Converting...</p>
            <Progress value={33} className="w-full" />
        </div>
    );
}