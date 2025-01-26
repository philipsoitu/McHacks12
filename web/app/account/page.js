"use client";

import { useState, useEffect } from "react";
import QRCode from 'qrcode';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

export default function Account({ patientId }) {
    const [qrCode, setQrCode] = useState('');
    const [user, setUser] = useState(null);
    const [showQR, setShowQR] = useState(false);

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

    const generateQRCode = async () => {
        try {
            if (user) {
                const qrData = JSON.stringify({ id: user.id, name: user.name });
                const qrCodeUrl = await QRCode.toDataURL(qrData);
                setQrCode(qrCodeUrl);
                setShowQR(true);
            }
        } catch (err) {
            console.error('Error generating QR Code:', err);
        }
    };

    return (
        <div className="text-center">
            {user ? (
                <>
                    <p>Hello, {user.name}</p>
                    <p>Your user ID is: {user.id}</p>
                    <Button onClick={generateQRCode} className="mt-4">Show QR Code</Button>
                    {showQR && qrCode && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <Card className="relative p-4 max-w-sm w-full bg-white rounded-lg shadow-lg" style={{ background: '#FFFFFF' }}>
                                <button onClick={() => setShowQR(false)} className="absolute top-2 right-2">
                                    <X className="w-6 h-6" />
                                </button>
                                <CardContent>
                                    <h2 className="text-lg font-bold mb-2 text-center">Generated QR Code</h2>
                                    <img src={qrCode} alt="QR Code" className="mx-auto border p-2 rounded-lg" />
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </>
            ) : (
                <p>Log in to see account</p>
            )}
        </div>
    );
}
