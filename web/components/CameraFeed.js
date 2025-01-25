export default function CameraFeed({ id, name }) {
    return (
      <div className="border p-2 rounded">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        {/* In a real application, you would integrate with a live video feed here */}
        <div className="bg-gray-200 h-40 flex items-center justify-center">Live Feed {id}</div>
      </div>
    )
  }
  
  