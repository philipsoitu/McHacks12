export default function CameraFeed({ id, name }) {
  return (
    <div className="border p-2 rounded">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      {/* In a real application, you would integrate with a live video feed here */}
      <div style={{ position: 'relative', paddingTop: '56.25%' }}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/BBeGmEpJVUY?autoplay=1`}
          allow="autoplay; encrypted-media"
          style={{ position: 'absolute', top: 0, left: 0 }}
        ></iframe>
      </div>
    </div>
  )
}

