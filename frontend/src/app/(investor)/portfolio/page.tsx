"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { Spinner, Tabs, Tab } from "@nextui-org/react";
import { ObjectId } from "mongodb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, ArrowRight, Wallet } from "lucide-react";

// Import components
import { ProfileCard } from "@/components/campaignComponents/profile/ProfileCard";
import { EditProfileForm } from "@/components/campaignComponents/profile/EditProfileForm";
import { PortfolioSummary } from "@/components/campaignComponents/profile/PortfolioSummary";
import { SearchBar } from "@/components/campaignComponents/profile/SearchBar";
import { InvestmentTable } from "@/components/campaignComponents/profile/InvestmentTable";
import { CryptoTable } from "@/components/campaignComponents/profile/CryptoTable";

export interface UserStatements {
    _id?: ObjectId;
    statement_id: string;
    user_id: string;
    campaign_id: string;
    campaignName: string;
    amount: number;
    session_id: string;
    date: string;
    successAt: string;
    status: string;
}

export interface CryptoTransaction {
    userId: string;
    campaignId: string;
    chargeId: string;
    chargeCode: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paymentProvider: string;
    status: 'created' | 'pending' | 'completed' | 'failed' | 'delayed' | 'resolved';
    metadata: {
        campaignName: string;
        companyName: string;
        chargeCode: string;
        userEmail?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const ITEMS_PER_PAGE = 10;

export default function Home() {
    const router = useRouter();
    const { user, isLoading: userLoading } = useUser();
    
    // State management
    const [userStatements, setUserStatements] = useState<UserStatements[]>([]);
    const [cryptoTransactions, setCryptoTransactions] = useState<CryptoTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [cryptoCurrentPage, setCryptoCurrentPage] = useState(1);
    
    // UI states
    const [selectedTab, setSelectedTab] = useState("statements");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc' | null;
    }>({ key: '', direction: null });
    
    // Profile editing states
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);
    const [nickname, setNickname] = useState<string | undefined>(undefined);

    const [hasStatements, setHasStatements] = useState<boolean>(false);

    // Utility functions
    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');
    };

    type FilterableItem = UserStatements | CryptoTransaction;

    // Then modify the filterData function
    const filterData = <T extends FilterableItem>(data: T[], query: string): T[] => {
        if (!query) return data;
        
        const searchInObject = (obj: any): boolean => {
            return Object.entries(obj).some(([key, value]) => {
                // If the value is an object (including arrays), search recursively
                if (value && typeof value === 'object') {
                    return searchInObject(value);
                }
                // Convert the value to string and search
                return String(value).toLowerCase().includes(query.toLowerCase());
            });
        };
    
        return data.filter(item => searchInObject(item));
    };
    
    // Update the sortData function as well
    const sortData = <T extends FilterableItem>(data: T[]): T[] => {
        if (!sortConfig.key || !sortConfig.direction) return data;
    
        return [...data].sort((a, b) => {
            let aValue = getNestedValue(a, sortConfig.key);
            let bValue = getNestedValue(b, sortConfig.key);
    
            // Handle dates
            if (sortConfig.key.includes('date') || sortConfig.key.includes('At')) {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }
            // Handle strings
            else if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
    
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };
    
    // Update the getNestedValue function to be more type-safe
    const getNestedValue = (obj: any, path: string): any => {
        try {
            return path.split('.').reduce((acc, part) => {
                if (acc === null || acc === undefined) return '';
                return acc[part];
            }, obj);
        } catch (error) {
            console.error(`Error getting nested value for path: ${path}`, error);
            return '';
        }
    };

    // Fetch user data and statements
    useEffect(() => {
        const fetchStatement = async () => {
            if (!user || userLoading) return;

            setLoading(true);
            try {
                const user_id = user.sub;
                const response = await fetch(`/api/statement/byuserid/${user_id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch investment statements.");
                }
                const data: UserStatements[] = await response.json();
                setUserStatements(data);
                setName(user.name || undefined);
                setNickname(user.nickname || undefined);
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching statements:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatement();
    }, [user, userLoading]);

    // Event handlers
    const handleSort = (key: string) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: 
                prevConfig.key === key && prevConfig.direction === 'asc' 
                    ? 'desc' 
                    : 'asc',
        }));
    };

    const handlePageChange = (page: number) => setCurrentPage(page);
    const handleCryptoPageChange = (page: number) => setCryptoCurrentPage(page);
    const toggleEdit = () => setIsEditing(!isEditing);

    const handleSave = async () => {
        try {
            const newData = { name, nickname };
            const response = await fetch('/api/user/patch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user?.sub,
                    newData,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user data');
            }
    
            setIsEditing(false);
            alert('User information saved! Please login again to see changes');
            router.push("/api/auth/logout");
        } catch (error) {
            console.error('Error saving user data:', error);
            alert('Failed to save user information. Please try again.');
        }
    };

    // useEffect(() => {
    //     const fetchAllData = async () => {
    //         if (!user || userLoading) return;

    //         setLoading(true);
    //         try {
    //             // Fetch statements
    //             const statementsResponse = await fetch(`/api/statement/byuserid/${user.sub}`);
    //             if (!statementsResponse.ok) {
    //                 throw new Error("Failed to fetch investment statements.");
    //             }
    //             const statementsData: UserStatements[] = await statementsResponse.json();
    //             setUserStatements(statementsData);
    //             setHasStatements(statementsData.length > 0);

    //             // Fetch crypto transactions
    //             const cryptoResponse = await fetch('/api/payment/coinbase/transaction-crypto');
    //             if (!cryptoResponse.ok) {
    //                 throw new Error("Failed to fetch crypto transactions.");
    //             }
    //             const cryptoData = await cryptoResponse.json();
    //             const userCryptoTransactions = cryptoData.filter(
    //                 (tx: CryptoTransaction) => tx.userId === user.sub
    //             );
    //             setCryptoTransactions(userCryptoTransactions);

    //             // Set user profile data
    //             setName(user.name || undefined);
    //             setNickname(user.nickname || undefined);
    //         } catch (err: any) {
    //             setError(err.message);
    //             console.error('Error fetching data:', err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchAllData();
    // }, [user, userLoading]);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!user || userLoading) return;
    
            setLoading(true);
            try {
                // Fetch statements
                const statementsResponse = await fetch(`/api/statement/byuserid/${user.sub}`);
                let statementsData: UserStatements[] = [];
                
                if (statementsResponse.status === 404) {
                    // Handle case where user has no statements
                    statementsData = [];
                } else if (statementsResponse.ok) {
                    statementsData = await statementsResponse.json();
                } else {
                    throw new Error("Failed to fetch investment statements.");
                }
                
                setUserStatements(statementsData);
                setHasStatements(statementsData.length > 0);
    
                // Fetch crypto transactions
                const cryptoResponse = await fetch('/api/payment/coinbase/transaction-crypto');
                if (!cryptoResponse.ok) {
                    throw new Error("Failed to fetch crypto transactions.");
                }
                const cryptoData = await cryptoResponse.json();
                const userCryptoTransactions = cryptoData.filter(
                    (tx: CryptoTransaction) => tx.userId === user.sub
                );
                setCryptoTransactions(userCryptoTransactions);
    
                // Set user profile data
                setName(user.name || undefined);
                setNickname(user.nickname || undefined);
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllData();
    }, [user, userLoading]);

    // Remove the separate useEffect for crypto transactions since we're fetching everything at once

    // Calculate portfolio summary data
    const completedCryptoTransactions = cryptoTransactions.filter(tx => tx.status === 'completed');
    const totalCryptoAmount = completedCryptoTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalTraditionalAmount = userStatements.reduce((sum, item) => sum + item.amount, 0);
    const totalCombinedAmount = totalTraditionalAmount + totalCryptoAmount;

    const uniqueTraditionalCampaigns = new Set(userStatements.map(item => item.campaignName));
    const uniqueCryptoCampaigns = new Set(completedCryptoTransactions.map(tx => tx.metadata.campaignName));
    const totalUniqueCampaigns = new Set([
        ...Array.from(uniqueTraditionalCampaigns),
        ...Array.from(uniqueCryptoCampaigns)
    ]).size;

    const latestTraditionalStatement = userStatements.length > 0 
        ? userStatements.reduce((latest, current) => 
            new Date(current.date) > new Date(latest.date) ? current : latest
        )
        : null;

    const latestCryptoTransaction = completedCryptoTransactions.length > 0
        ? completedCryptoTransactions.reduce((latest, current) => 
            new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
        )
        : null;

    // Get the absolute latest transaction between both types
    const getLatestTransaction = () => {
        if (!latestTraditionalStatement && !latestCryptoTransaction) return null;
        if (!latestTraditionalStatement) return {
            amount: latestCryptoTransaction!.amount,
            campaignName: latestCryptoTransaction!.metadata.campaignName,
            type: 'crypto',
            date: new Date(latestCryptoTransaction!.createdAt)
        };
        if (!latestCryptoTransaction) return {
            amount: latestTraditionalStatement.amount,
            campaignName: latestTraditionalStatement.campaignName,
            type: 'traditional',
            date: new Date(latestTraditionalStatement.date)
        };

        const cryptoDate = new Date(latestCryptoTransaction.createdAt);
        const traditionalDate = new Date(latestTraditionalStatement.date);

        return cryptoDate > traditionalDate
            ? {
                amount: latestCryptoTransaction.amount,
                campaignName: latestCryptoTransaction.metadata.campaignName,
                type: 'crypto',
                date: cryptoDate
            }
            : {
                amount: latestTraditionalStatement.amount,
                campaignName: latestTraditionalStatement.campaignName,
                type: 'traditional',
                date: traditionalDate
            };
    };

    const latestOverallTransaction = getLatestTransaction();

    // Loading and error states
    if (loading || userLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
    }
    // if (error) return <p>Error: {error}</p>;

    // Processed data
    const filteredAndSortedInvestments = sortData(filterData(userStatements, searchQuery));
    const filteredAndSortedCryptoTransactions = sortData(filterData(cryptoTransactions, searchQuery));

    const currentInvestments = filteredAndSortedInvestments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const currentCryptoTransactions = filteredAndSortedCryptoTransactions.slice(
        (cryptoCurrentPage - 1) * ITEMS_PER_PAGE,
        cryptoCurrentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(filteredAndSortedInvestments.length / ITEMS_PER_PAGE);
    const cryptoTotalPages = Math.ceil(filteredAndSortedCryptoTransactions.length / ITEMS_PER_PAGE);

    // Portfolio summary calculations
    const totalAmount = userStatements.reduce((sum, item) => sum + item.amount, 0);
    const uniqueCampaigns = new Set(userStatements.map(item => item.campaignName));
    const totalInvestedCampaigns = uniqueCampaigns.size;
    const latestStatement = userStatements[userStatements.length - 1];

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 sm:py-8 lg:py-12">
                <ProfileCard
                    user={user}
                    name={name}
                    nickname={nickname}
                    isEditing={isEditing}
                    toggleEdit={toggleEdit}
                    EditForm={
                        <EditProfileForm
                            name={name}
                            nickname={nickname}
                            setName={setName}
                            setNickname={setNickname}
                            handleSave={handleSave}
                        />
                    }
                />
            </div>
    
            {cryptoTransactions.length === 0 && !hasStatements ? (
                // Case 3: No statements and no crypto transactions
                <div className="w-full px-4 md:px-6 py-6 md:py-12">
                    <Card className="max-w-2xl mx-auto shadow-lg">
                        <CardHeader className="text-center space-y-2">
                            <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                <Wallet className="w-6 h-6 text-blue-500" />
                            </div>
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                No Investment Statements and Crypto Transactions Yet
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground">
                                You have not made any investments yet.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <p className="flex justify-center text-sm text-muted-foreground leading-relaxed">
                                    Start investing in campaigns to see your investment history here.
                                </p>
                            </div>
                            <div className="flex justify-center pt-4">
                                <Button
                                    onClick={() => router.push('/campaign')}
                                    className="w-full sm:w-auto"
                                    size="lg"
                                >
                                    <span className="flex items-center gap-2">
                                        Browse Campaigns
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <>
                    <div className="py-6">
                        <PortfolioSummary
                            totalAmount={totalAmount}
                            totalInvestedCampaigns={totalInvestedCampaigns}
                            latestStatement={latestStatement}
                            cryptoTransactions={cryptoTransactions}
                        />
                    </div>
    
                    {/* Transactions Section */}
                    <div className="py-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div className="w-full sm:w-auto">
                                <Tabs 
                                    selectedKey={selectedTab}
                                    onSelectionChange={(key) => setSelectedTab(key.toString())}
                                    className="max-w-full sm:max-w-md"
                                >
                                    <Tab key="statements" title="Investment Statements" />
                                    <Tab key="crypto" title="Crypto Transactions" />
                                </Tabs>
                            </div>
                            
                            <div className="w-full sm:w-auto">
                                <SearchBar
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                            </div>
                        </div>
    
                        <div className="overflow-x-auto">
                            {selectedTab === "statements" ? (
                                !hasStatements ? (
                                    // Case 1: No statements (might have crypto)
                                    <Card className="w-full shadow-sm">
                                        <CardContent className="flex flex-col items-center justify-center py-12">
                                            <div className="rounded-full bg-gray-50 p-3 mb-4">
                                                <AlertCircle className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                No Statement Found
                                            </h3>
                                            <p className="text-sm text-gray-500 text-center max-w-md">
                                                You have not made any traditional investments yet.
                                                {cryptoTransactions.length > 0 && (
                                                    <span className="block mt-2">
                                                        Check out your crypto transactions in the Crypto tab.
                                                    </span>
                                                )}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <InvestmentTable
                                        statements={currentInvestments}
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                        sortConfig={sortConfig}
                                        onSort={handleSort}
                                        formatDate={formatDate}
                                    />
                                )
                            ) : (
                                // Crypto tab content
                                <CryptoTable
                                    transactions={currentCryptoTransactions}
                                    currentPage={cryptoCurrentPage}
                                    totalPages={cryptoTotalPages}
                                    onPageChange={handleCryptoPageChange}
                                    sortConfig={sortConfig}
                                    onSort={handleSort}
                                    formatDate={formatDate}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}