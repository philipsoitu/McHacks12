'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Send the data to the backend
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, first_name, last_name, password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push('/login'); // Redirect to login after successful sign-up
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="input mb-4"
        />
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
          className="input mb-4"
        />
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
          className="input mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="input mb-4"
        />
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
}
