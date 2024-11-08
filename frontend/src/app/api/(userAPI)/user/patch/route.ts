import {NextRequest, NextResponse} from "next/server";
import {UserController} from "@/controller/userAPI/userController";

const userController = new UserController()

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { user_id, newData } = body;

        if (!user_id || !newData) {
            return NextResponse.json({ error: 'No Data to patch' }, { status: 400 });
        }

        // Await the result from the controller method
        return await userController.patchUserData(newData, user_id);
    } catch (error) {
        console.error('Error in PATCH API:', error);
        return NextResponse.json({ error: 'Error patching profile' }, { status: 500 });
    }
}
