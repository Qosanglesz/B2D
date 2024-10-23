// import { NextResponse } from 'next/server';
// import { UserController } from '@/controller/userAPI/userController';

// const userController = new UserController();

// export async function GET(): Promise<NextResponse> {
//     return userController.getUsers();
// }
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { UserController } from '@/controller/userAPI/userController';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const userController = new UserController();

export async function GET(request: NextRequest): Promise<NextResponse> {
    return userController.getUsers();
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
    const { newData, userId } = await request.json();
    return userController.patchUserData(newData, userId);
}