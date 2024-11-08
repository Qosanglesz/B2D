// app/api/crypto-summary/route.ts
import { NextResponse } from 'next/server';
import { CoinbaseService } from '@/controller/coinbaseAPI/coinbaseService';

export async function GET() {
    try {
        const service = new CoinbaseService();
        const result = await service.getCryptoSummary();

        if (!result.success) {
            return NextResponse.json(
                { 
                    message: 'Failed to fetch crypto summary',
                    error: result.error 
                },
                { status: 500 }
            );
        }

        const headers = {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        };

        return NextResponse.json({
            message: 'Crypto transactions summary retrieved successfully',
            summary: result.data
        }, { 
            headers,
            status: 200 
        });

    } catch (error) {
        console.error('Error in crypto-summary endpoint:', error);
        return NextResponse.json(
            { 
                message: 'Error fetching crypto summary',
                error: process.env.NODE_ENV === 'development' 
                    ? (error instanceof Error ? error.message : String(error)) 
                    : undefined
            },
            { status: 500 }
        );
    }
}

// Optional: Add HEAD method for health checks
export async function HEAD() {
    try {
        const controller = new CoinbaseController();
        await controller.getCryptoSummary();
        return new NextResponse(null, { status: 200 });
    } catch (error) {
        return new NextResponse(null, { status: 500 });
    }
}