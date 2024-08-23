import { NextRequest, NextResponse } from 'next/server';

const WINDOW_SIZE = 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_REQUESTS = 100; // Maximum requests per window

interface RateLimitInfo {
    count: number;
    resetTime: number;
}

const ipRequestCounts = new Map<string, RateLimitInfo>();

export function rateLimitMiddleware(request: NextRequest) {
    const ip = request.ip || 'unknown';
    const now = Date.now();

    let rateLimitInfo = ipRequestCounts.get(ip);

    if (!rateLimitInfo || now > rateLimitInfo.resetTime) {
        rateLimitInfo = { count: 0, resetTime: now + WINDOW_SIZE };
    }

    rateLimitInfo.count++;
    ipRequestCounts.set(ip, rateLimitInfo);

    const remainingRequests = MAX_REQUESTS - rateLimitInfo.count;

    if (remainingRequests < 0) {
        return NextResponse.json(
            { error: 'Too many requests, please try again later.' },
            { status: 429 }
        );
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString());
    response.headers.set('X-RateLimit-Remaining', remainingRequests.toString());
    response.headers.set('X-RateLimit-Reset', rateLimitInfo.resetTime.toString());

    return response;
}