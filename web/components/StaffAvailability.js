export default function StaffAvailability({ hospitalId }) {
    // This is placeholder data. In a real application, you would fetch this from your API.
    const staffAvailability = [
      { role: "Doctors", available: 15, total: 20 },
      { role: "Nurses", available: 30, total: 40 },
      { role: "Technicians", available: 10, total: 15 },
      // Add more staff roles as needed
    ]
  
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Staff Availability</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Role</th>
              <th className="text-left">Available</th>
              <th className="text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {staffAvailability.map((staff) => (
              <tr key={staff.role}>
                <td>{staff.role}</td>
                <td>{staff.available}</td>
                <td>{staff.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  