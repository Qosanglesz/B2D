"use client"

import React, { useEffect, useState } from 'react';
import StatementsTable from '@/components/adminComponents/adminStatement/StatementsTable';
import { User } from "@/types/User";
import { Statement, StatementWithUser } from "@/types/Statement";
import {LoadingError} from "@/components/homeComponents/LoadingError";

export default function StatementsPage() {
    const [statementsWithUser, setStatementsWithUser] = useState<StatementWithUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statementsRes, usersRes] = await Promise.all([
                    fetch('/api/statements'),
                    fetch('/api/users')
                ]);

                const statements: Statement[] = await statementsRes.json();
                const users: User[] = await usersRes.json();

                const combinedStatements: StatementWithUser[] = statements.map(statement => {
                    const user = users.find(u => u.user_id === statement.user_id) || null;
                    return { ...statement, user };
                });

                setStatementsWithUser(combinedStatements);
            } catch (err) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <LoadingError loading={loading} error={error} />;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <StatementsTable initialStatements={statementsWithUser} />
        </div>
    );
}