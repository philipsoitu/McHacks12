export default function ResourceInventory({ hospitalId }) {
    // This is placeholder data. In a real application, you would fetch this from your API.
    const resources = [
      { name: "X-ray Machine", available: 2, total: 3, waitlist: 5 },
      { name: "MRI Machine", available: 1, total: 2, waitlist: 8 },
      { name: "CT Scanner", available: 1, total: 1, waitlist: 3 },
      // Add more resources as needed
    ]
  
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Resource Inventory</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Resource</th>
              <th className="text-left">Available</th>
              <th className="text-left">Total</th>
              <th className="text-left">Waitlist</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.name}>
                <td>{resource.name}</td>
                <td>{resource.available}</td>
                <td>{resource.total}</td>
                <td>{resource.waitlist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  