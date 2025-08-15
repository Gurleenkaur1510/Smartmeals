export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-2 text-gray-700">There was a problem signing you in. Please try again.</p>
      </div>
    </div>
  );
}
