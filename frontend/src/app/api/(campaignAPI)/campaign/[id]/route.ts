import { NextRequest, NextResponse } from 'next/server';
import { CampaignController } from '@/components/apiComponents/campaignAPI/campaignController';

const campaignController = new CampaignController();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const id = parseInt(params.id, 10);
    return campaignController.getCampaign(id);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const id = parseInt(params.id, 10);
    const updatedData = await request.json();
    return campaignController.updateCampaign(id, updatedData);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const id = parseInt(params.id, 10);
    return campaignController.deleteCampaign(id);
}