'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Send login request
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push('/account'); // Redirect to dashboard if successful
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50" style={{ backgroundColor: '#F1F8F9'}}>
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            {/* Submit Button */}
            <div>
            <Button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: '#107DA5', color: '#FFFFFF' }} // Inline style as a fallback
              >
                Log In
              </Button>
              
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
  
}