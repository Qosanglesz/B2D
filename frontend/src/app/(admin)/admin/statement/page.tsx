import { Suspense } from 'react';
import StatementsTable from '@/components/adminComponents/adminStatement/StatementsTable';
import { User } from "@/types/User";
import { Statement, StatementWithUser } from "@/types/Statement";
import { LoadingError } from "@/components/homeComponents/LoadingError";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function fetchStatementsWithUsers() {
    try {
        const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
            method: "GET",
            headers: {
                accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
            }
        })
        const tokenData = await tokenResponse.json()
        const [statementsRes, usersRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statements`, {
                cache: 'no-store',
                headers: {
                    authorization: `Bearer ${tokenData.access_token}`,
                }
            }),
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, { cache: 'no-store',
                headers: {
                    authorization: `Bearer ${tokenData.access_token}`,
                } })
        ]);

        const statements: Statement[] = await statementsRes.json();
        const users: User[] = await usersRes.json();

        const combinedStatements: StatementWithUser[] = statements.map(statement => {
            const user = users.find(u => u.user_id === statement.user_id) || null;
            return { ...statement, user };
        });

        return combinedStatements;
    } catch (err) {
        return [];
    }
}

export default async function StatementsPage() {
    const statementsWithUser = await fetchStatementsWithUsers();

    return (
        <div className="container mx-auto p-4">
            <Suspense fallback={<LoadingError loading={true} error={null} />}>
                <StatementsTable initialStatements={statementsWithUser} />
            </Suspense>
        </div>
    );
}