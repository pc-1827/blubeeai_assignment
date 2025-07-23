"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function PaymentCancel() {
    const router = useRouter();

    useEffect(() => {
        toast.error("Payment was cancelled", {
            duration: 5000,
        });

        // Redirect back to home after 3 seconds
        const timer = setTimeout(() => {
            router.push("/");
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#111111"
        }}>
            <Image
                src="/svgs/CrossRed.svg"
                alt="Cancelled"
                width={60}
                height={60}
            />
            <h1 style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#e8e8e6",
                marginTop: "20px"
            }}>
                Payment Cancelled
            </h1>
            <p style={{
                fontSize: "1.2rem",
                color: "#989898",
                marginTop: "10px",
                maxWidth: "600px"
            }}>
                Your payment process was cancelled. You can try again whenever you&apos;re ready.
            </p>
            <p style={{
                fontSize: "1rem",
                color: "#989898",
                marginTop: "20px"
            }}>
                Redirecting you back to the app...
            </p>
        </div>
    );
}