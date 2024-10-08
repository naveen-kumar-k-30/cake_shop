

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="flex flex-col items-center space-y-2">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="text-gray-600 text-lg">Loading...</p>
    </div>
  </div>
  )
}

export default Loader