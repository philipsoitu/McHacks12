"use client";

import { useState, useEffect } from "react";
import QRCode from 'qrcode';

export default function Account({ patientId }) {
    const [qrCode, setQrCode] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.success) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            generateQRCode();
        }
    }, [user]);

    const generateQRCode = async () => {
        try {
            const qrData = JSON.stringify({ id: user.id, name: user.name });
            const qrCodeUrl = await QRCode.toDataURL(qrData);
            setQrCode(qrCodeUrl);
        } catch (err) {
            console.error('Error generating QR Code:', err);
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <p>Hello, {user.name}</p>
                    <p>Your user ID is: {user.id}</p>
                    {qrCode && (
                        <div className="text-center">
                            <h2 className="text-lg font-bold mb-2">Generated QR Code</h2>
                            <img src={qrCode} alt="QR Code" className="inline-block border p-2 rounded-lg" />
                        </div>
                    )}
                </>
            ) : (
                <p>Log in to see account</p>
            )}
        </div>
    );
}
