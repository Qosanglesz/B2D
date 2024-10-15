import React from "react";
import Image from "next/image";
import ReportsAndAnalytics from "@/components/adminComponents/adminMainPage/ReportAndAnalytics";

export default function Admin() {
    const stats = [
        { value: "3M+", description: "Global investor community" },
        { value: "2000+", description: "Private ventures funded" },
        { value: "\$2.6B+", description: "Capital raised" },
        { value: "31", description: "Unicorns in portfolio" },
        { value: "150", description: "Countries" },
    ];

    return (
        <div className="">
            <div className="relative inset-0 bg-cover overflow-hidden">
                <Image
                    src="/images/movie_bg.jpeg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <section className="relative text-center py-16 z-10">
                    <h1 className="text-4xl font-bold mb-6 text-white">Stake your claim</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
                        At b2s venture, our innovative investment platform connects visionary startups with a network of
                        trusted investors. By leveraging cutting-edge technology, we provide secure and streamlined access to funding,
                        facilitating primary issuance, secondary trading, and comprehensive support for businesses looking
                        to thrive in the ever-evolving world of finance.
                    </p>
                    <button className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
                        Get in touch
                    </button>
                </section>

                {/* Icons Section */}
                <section className="flex justify-center space-x-8 py-12">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="relative w-16 h-16">
                            <Image
                                src={`https://picsum.photos/seed/${index}/200/300/?blur`}
                                alt={`icon${index}`}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    ))}
                </section>
            </div>

            {/* Infrastructure Snapshot Section */}
            <section className="bg-white py-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="space-y-2">
                            <p className="text-4xl font-semibold text-blue-500">{stat.value}</p>
                            <p className="text-md text-gray-800">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <ReportsAndAnalytics />
        </div>
    );
}