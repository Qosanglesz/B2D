import React from 'react';
import AdminDashboard from '@/components/adminComponents/adminDashboard/AdminDashboard';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function Page() {
    return (
        <AdminDashboard/>
    );
}