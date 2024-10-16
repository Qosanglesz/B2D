import { NextRequest, NextResponse } from 'next/server';
import { CampaignController } from '@/controller/campaignAPI/campaignController';

const campaignController = new CampaignController();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const id = params.id;
    return campaignController.getCampaign(id);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const id = params.id;
    const updatedData = await request.json();
    return campaignController.updateCampaign(id, updatedData);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const id = params.id;
    return campaignController.deleteCampaign(id);
}