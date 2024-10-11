"use client"


import {useEffect, useState} from 'react';
import StatementsTable from '@/components/adminComponents/adminStatement/StatementsTable';
import {User} from "@/components/types/User";
import {Statement} from "@/components/types/Statement";


export default function StatementsPage() {
    // Define state for statements with user data
    const [statementsWithUser, setStatementsWithUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from the API on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch both statements and users data
                const [statementsRes, usersRes] = await Promise.all([
                    fetch('/api/statements'),
                    fetch('/api/users')
                ]);

                const statements: Statement[] = await statementsRes.json();
                const users: User[] = await usersRes.json();

                // Combine statements with user data
                const combinedStatements = statements.map(statement => {
                    const user = users.find(u => u.user_id === statement.user_id) || null;
                    return {...statement, user};
                });

                // Update state with combined data
                setStatementsWithUser(combinedStatements);
            } catch (err) {
                // Handle errors
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <StatementsTable initialStatements={statementsWithUser}/>
        </div>
    );
}