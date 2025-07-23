"use client";

import React from 'react';
import Stock from '@/components/Stock/Stock';

// Create a serializable data formatter
const dataFormatterString = "Intl.NumberFormat('us').format(number).toString()";

export default function StocksPage() {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#e8e8e6', marginBottom: '20px' }}>Stocks Plugin</h1>
            <p style={{ color: '#e8e8e6aa', marginBottom: '20px' }}>
                This feature is currently disabled in test mode.
            </p>
            <div style={{ marginTop: '20px' }}>
                {/* Mock stock data for display */}
                <Stock stockResults={{
                    companyName: "Example Corp",
                    ticker: "EXMP",
                    exchange: "NASDAQ",
                    currentPrice: 150.00,
                    change: {
                        amount: 5.25,
                        percentage: 3.62
                    },
                    chartData: [],
                    open: 145.00,
                    high: 152.50,
                    low: 144.75,
                    previousClose: 144.75,
                    marketCap: 1000000000,
                    peRatio: 25.5,
                    dividendYield: "1.2%",
                    high52Week: 160.00,
                    low52Week: 120.00
                }} />
            </div>
        </div>
    );
}