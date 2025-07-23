"use client";

import React, { useState } from "react";
import styles from "./ProPlanButton.module.css";
import SpinnerWhite from "../SpinnerWhite/SpinnerWhite";

export default function ProPlanButton() {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { url } = await response.json();

            // Redirect to Stripe Checkout
            window.location.href = url;
        } catch (error) {
            console.error("Error creating checkout session:", error);
            setLoading(false);
        }
    };

    return (
        <div className={styles.proButton} onClick={handleSubscribe}>
            {loading ? (
                <div className={styles.spinner}>
                    <SpinnerWhite />
                </div>
            ) : (
                <span className={styles.buttonText}>Pro</span>
            )}
        </div>
    );
}