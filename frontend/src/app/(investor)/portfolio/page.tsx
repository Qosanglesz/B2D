// app/profile/page.tsx
import {getSession} from "@auth0/nextjs-auth0";
import {redirect} from "next/navigation";
import {ObjectId} from "mongodb";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {ArrowRight, Wallet} from "lucide-react";

import {ProfileCard} from "@/components/campaignComponents/profile/ProfileCard";
import {PortfolioSummary} from "@/components/campaignComponents/profile/PortfolioSummary";
import ClientWrapper from "@/components/campaignComponents/profile/ClientWrapper";

interface UserStatements {
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

interface CryptoTransaction {
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

async function getStatements(userId: string): Promise<UserStatements[]> {
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
        method: "GET",
        headers: {
            accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
        }
    })
    const tokenData = await tokenResponse.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statement/byuserid/${userId}`,
        {
            cache: 'no-store',
            headers: {
                authorization: `Bearer ${tokenData.access_token}`,
            }
        });
    if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error("Failed to fetch investment statements");
    }
    return response.json();
}

async function getCryptoTransactions(): Promise<CryptoTransaction[]> {
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
        method: "GET",
        headers: {
            accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
        }
    })
    const tokenData = await tokenResponse.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/coinbase/transaction-crypto`,
        {
            cache: 'no-store',
            headers: {
                authorization: `Bearer ${tokenData.access_token}`,
            }
        });
    if (!response.ok) {
        throw new Error("Failed to fetch crypto transactions");
    }
    return response.json();
}

export default async function ProfilePage() {
    const session = await getSession();
    if (!session?.user) {
        redirect('/api/auth/login');
    }

    const user = session.user;

    // Fetch data
    /*const [statements, cryptoTransactions] = await Promise.all([
        getStatements(user.sub),
        getCryptoTransactions()
    ]);*/

    const statements = await getStatements(user.sub);
    const cryptoTransactions = await getCryptoTransactions();

    const userCryptoTransactions = cryptoTransactions.filter(tx => tx.userId === user.sub);
    const hasStatements = statements.length > 0;

    // Portfolio calculations
    const completedCryptoTransactions = userCryptoTransactions.filter(tx => tx.status === 'completed');
    const totalCryptoAmount = completedCryptoTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalTraditionalAmount = statements.reduce((sum, item) => sum + item.amount, 0);
    const totalCombinedAmount = totalTraditionalAmount + totalCryptoAmount;

    const uniqueTraditionalCampaigns = new Set(statements.map(item => item.campaignName));
    const uniqueCryptoCampaigns = new Set(completedCryptoTransactions.map(tx => tx.metadata.campaignName));
    const totalUniqueCampaigns = new Set([
        ...Array.from(uniqueTraditionalCampaigns),
        ...Array.from(uniqueCryptoCampaigns)
    ]).size;

    // If there are no investments at all, show the empty state
    if (userCryptoTransactions.length === 0 && !hasStatements) {
        return (
            <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6 sm:py-8 lg:py-12">
                    <ProfileCard user={user}/>
                </div>

                <div className="w-full px-4 md:px-6 py-6 md:py-12">
                    <Card className="max-w-2xl mx-auto shadow-lg">
                        <CardHeader className="text-center space-y-2">
                            <div
                                className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                <Wallet className="w-6 h-6 text-blue-500"/>
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
                                    asChild
                                    className="w-full sm:w-auto"
                                    size="lg"
                                >
                                    <a href="/campaign" className="flex items-center gap-2">
                                        Browse Campaigns
                                        <ArrowRight className="w-4 h-4"/>
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 sm:py-8 lg:py-12">
                <ProfileCard user={user}/>
            </div>

            <div className="py-6">
                <PortfolioSummary
                    totalAmount={totalTraditionalAmount}
                    totalInvestedCampaigns={totalUniqueCampaigns}
                    latestStatement={statements[statements.length - 1]}
                    cryptoTransactions={userCryptoTransactions}
                />
            </div>

            <ClientWrapper
                statements={statements}
                cryptoTransactions={userCryptoTransactions}
                hasStatements={hasStatements}
            />
        </div>
    );
}