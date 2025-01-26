"use client";

import { useState, useEffect } from "react";

export default function SignUpPage() {

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
    return (
        <div>
            {user ? (
                <>
                    {user.email}
                </>
            ) : (
                <>
                    <p>Log in to see account</p>
                </>
            )}
        </div>
    );
}
