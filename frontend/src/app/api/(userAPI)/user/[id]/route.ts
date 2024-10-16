import { NextRequest, NextResponse } from 'next/server';
import { UserController } from '@/controller/userAPI/userController';

const userController = new UserController();

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const userId = params.id;
    return userController.getUsers(userId);
}