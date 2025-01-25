export default function EmergencyCases({ hospitalId }) {
    // This is placeholder data. In a real application, you would fetch this from your API.
    const emergencyCases = [
      { id: 1, type: "Cardiac Arrest", severity: "Critical", arrivalTime: "10:30 AM" },
      { id: 2, type: "Severe Burns", severity: "High", arrivalTime: "11:15 AM" },
      { id: 3, type: "Multiple Fractures", severity: "Medium", arrivalTime: "11:45 AM" },
      // Add more emergency cases as needed
    ]
  
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Emergency Cases</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Type</th>
              <th className="text-left">Severity</th>
              <th className="text-left">Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            {emergencyCases.map((emergency) => (
              <tr key={emergency.id}>
                <td>{emergency.type}</td>
                <td>{emergency.severity}</td>
                <td>{emergency.arrivalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  