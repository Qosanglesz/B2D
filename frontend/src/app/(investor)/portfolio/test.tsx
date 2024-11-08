    // Keep all your existing helper functions (getNestedValue, filterData, sortData, etc.)
    // Keep all your existing useEffect hooks and handlers

    // Your existing return statement starts here
    return (
        <div className="min-h-screen">
            {/* Keep your existing profile section */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="mx-auto bg-white shadow-md rounded-lg p-6 max-w-full grid grid-cols-3 gap-8">
                    {/* ... existing profile content ... */}
                </div>
            </div>

            {/* Keep your existing portfolio summary section */}
            <div>
                <h1 className="text-3xl font-bold my-4 mx-3">User Investment Portfolio</h1>
                <div className="grid grid-cols-3 gap-4 mx-3 my-3">
                    {/* ... existing summary cards ... */}
                </div>
            </div>

            {/* Updated Tabs and Search section */}
            <div className="mx-3 my-14">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-1">
                        <Tabs 
                            selectedKey={selectedTab}
                            onSelectionChange={(key) => setSelectedTab(key.toString())}
                            className="w-2/3"
                        >
                            <Tab 
                                key="statements" 
                                title={
                                    <div className="flex items-center gap-2">
                                        <span>Investment Statements</span>
                                    </div>
                                }
                            >
                                <div className="mt-4">
                                    <h2 className="text-2xl font-semibold mb-4">Investment Statements</h2>
                                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                        {/* ... existing investment statements table ... */}
                                    </table>
                                    {/* ... existing investment pagination ... */}
                                </div>
                            </Tab>
                            
                            <Tab 
                                key="crypto" 
                                title={
                                    <div className="flex items-center gap-2">
                                        <span>Crypto Transactions</span>
                                    </div>
                                }
                            >
                                <div className="mt-4">
                                    <h2 className="text-2xl font-semibold mb-4">Crypto Transactions</h2>
                                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                        {/* ... existing crypto transactions table ... */}
                                    </table>
                                    {/* ... existing crypto pagination ... */}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    
                    <div className="relative w-1/3">
                        <input
                            type="text"
                            placeholder="Search in table..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 pl-8 border border-gray-300 rounded-lg"
                        />
                        <FaSearch className="absolute left-2 top-3 text-gray-400" />
                    </div>
                </div>

                {/* Tables Content */}
                {selectedTab === "statements" ? (
                    <div className="mt-4">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                {/* ... Keep your existing investment statements table headers ... */}
                            </thead>
                            <tbody>
                                {currentInvestments.map((userStatement) => (
                                    /* ... Keep your existing investment statements rows ... */
                                ))}
                            </tbody>
                        </table>
                        {/* Keep your existing investment statements pagination */}
                    </div>
                ) : (
                    <div className="mt-4">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                {/* ... Keep your existing crypto transactions table headers ... */}
                            </thead>
                            <tbody>
                                {currentCryptoTransactions.map((transaction) => (
                                    /* ... Keep your existing crypto transactions rows ... */
                                ))}
                            </tbody>
                        </table>
                        {/* Keep your existing crypto transactions pagination */}
                    </div>
                )}
            </div>
        </div>
    );
}