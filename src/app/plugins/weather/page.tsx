import React from 'react';
import Weather from '@/components/Weather/Weather';

export default function WeatherPage() {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#e8e8e6', marginBottom: '20px' }}>Weather Plugin</h1>
            <p style={{ color: '#e8e8e6aa', marginBottom: '20px' }}>
                This feature is currently disabled in test mode.
            </p>
            <div style={{ marginTop: '20px' }}>
                {/* Mock weather data for display */}
                <Weather weatherResults={{
                    city: "New York",
                    current: {
                        temperature: 72,
                        weather: "Sunny",
                        description: "Clear sky",
                        icon: "01d"
                    },
                    hourly: [
                        { time: "Now", temperature: 72, weather: "Sunny", icon: "01d" },
                        { time: "1PM", temperature: 74, weather: "Sunny", icon: "01d" },
                        { time: "2PM", temperature: 75, weather: "Sunny", icon: "01d" },
                        { time: "3PM", temperature: 74, weather: "Sunny", icon: "01d" },
                        { time: "4PM", temperature: 73, weather: "Sunny", icon: "01d" }
                    ],
                    daily: {
                        maxTemp: 75,
                        minTemp: 65
                    }
                }} />
            </div>
        </div>
    );
}