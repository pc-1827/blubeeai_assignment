"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import Dictionary component with no SSR
const Dictionary = dynamic(() => import('@/components/Dictionary/Dictionary'), {
    ssr: false, // This is crucial - prevents server-side rendering
    loading: () => <p>Loading dictionary component...</p>
});

export default function DictionaryPage() {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#e8e8e6', marginBottom: '20px' }}>Dictionary Plugin</h1>
            <p style={{ color: '#e8e8e6aa', marginBottom: '20px' }}>
                This feature is currently disabled in test mode.
            </p>
            <div style={{ marginTop: '20px' }}>
                <Suspense fallback={<div>Loading dictionary...</div>}>
                    {/* Mock dictionary data for display */}
                    <Dictionary dictionaryResults={{
                        word: "example",
                        phonetic: "/ɪɡˈzæmpəl/",
                        phonetics: [
                            {
                                text: "/ɪɡˈzæmpəl/",
                                audio: "https://api.dictionaryapi.dev/media/pronunciations/en/example-uk.mp3",
                                sourceUrl: null,
                                license: null
                            }
                        ],
                        meanings: [
                            {
                                partOfSpeech: "noun",
                                definitions: [
                                    {
                                        definition: "Something that serves to illustrate or explain a rule.",
                                        example: "This is an example of a well-formed sentence."
                                    },
                                    {
                                        definition: "A problem or exercise set up to illustrate a rule.",
                                        example: "The examples were easy to follow."
                                    }
                                ]
                            }
                        ]
                    }} />
                </Suspense>
            </div>
        </div>
    );
}