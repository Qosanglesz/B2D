"use client"

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReportsAndAnalytics from "@/components/adminComponents/adminMainPage/ReportAndAnalytics";
import Link from "next/link";

export default function Admin() {
    const stats = [
        { value: "USD", description: "Currency" },
        { value: "several", description: "Fundraising Campaigns" },
        { value: "Reliable", description: "Companies around the world" },
        { value: "150", description: "Countries" },
        { value: "Secure", description: "User information" },
    ];

    return (
        <div className="min-h-screen">
            <div className="relative h-[600px] lg:h-[700px]">
                <Image
                    src="/images/movie_bg.jpeg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative h-full flex items-center justify-center">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                                Stake your claim
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                                At B2D venture, our innovative investment platform connects visionary startups with a network of
                                trusted investors. By leveraging cutting-edge technology, we provide secure and streamlined
                                access to funding, facilitating primary issuance, secondary trading, and comprehensive support for businesses
                                looking to thrive in the ever-evolving world of finance.
                            </p>
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                <Link href="/admin/dashboard">
                                    Get in touch
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <section className="flex justify-center py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6 flex justify-center">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 max-w-6xl">
                        {stats.map((stat, index) => (
                            <Card key={index} className="flex flex-col items-center">
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <ReportsAndAnalytics />
        </div>
    );
}