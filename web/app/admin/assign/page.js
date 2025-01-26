"use client";

import { useEffect, useState } from "react";

export default function AssignUsersPage() {
  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch unassigned users and hospitals in parallel
        const [usersResponse, hospitalsResponse] = await Promise.all([
          fetch("/api/users/unassigned"),
          fetch("/api/hospitals"),
        ]);

        if (!usersResponse.ok || !hospitalsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const usersData = await usersResponse.json();
        const hospitalsData = await hospitalsResponse.json();

        // Set users and hospitals
        setUsers(usersData);
        setHospitals(hospitalsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assign Users to Hospitals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unassigned Users Section */}
        {selectedUser ? (
          <div>
            <button
              onClick={() => setSelectedUser(null)}
              className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
            >
              ← Back to Users
            </button>
            <h2 className="text-xl font-semibold mb-3">
              Assign {selectedUser.first_name} {selectedUser.last_name} to a Hospital
            </h2>
            <ul className="space-y-2">
              {hospitals.map((hospital) => (
                <li
                  key={hospital.id}
                  className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
                  onClick={() => assignUserToHospital(selectedUser, hospital)}
                >
                  <p><strong>Name:</strong> {hospital.name}</p>
                  <p><strong>Location:</strong> {hospital.location}</p>
                  <p><strong>Capacity:</strong> {hospital.capacity}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-xl font-semibold mb-3">Unassigned Users</h2>
              <ul className="space-y-2">
                {users.length === 0 ? (
                  <p>No unassigned users found.</p>
                ) : (
                  users.map((user) => (
                    <li
                      key={user.id}
                      className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedUser(user)}
                    >
                      <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p className="text-red-500"><strong>Hospital:</strong> Not Assigned</p>
                      <p><strong>Urgency:</strong> {user.urgency}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Hospitals Section */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Hospitals</h2>
              <ul className="space-y-2">
                {hospitals.length === 0 ? (
                  <p>No hospitals found.</p>
                ) : (
                  hospitals.map((hospital) => (
                    <li key={hospital.id} className="p-4 border rounded-lg shadow">
                      <p><strong>Name:</strong> {hospital.name}</p>
                      <p><strong>Location:</strong> {hospital.location}</p>
                      <p><strong>Capacity:</strong> {hospital.capacity}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );

  async function assignUserToHospital(user, hospital) {
    try {
      const response = await fetch("/api/users/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, hospitalId: hospital.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign user to hospital");
      }

      alert(`Assigned ${user.first_name} ${user.last_name} to ${hospital.name}`);
      setSelectedUser(null);
      setUsers(users.filter((u) => u.id !== user.id)); // Remove assigned user from the list
    } catch (err) {
      alert(err.message);
    }
  }
}
