export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-800 px-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-lg">Page not found</p>
      <p className="text-sm text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>

      <a
        href="/"
        className="mt-6 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 transition"
      >
        Go Home
      </a>
    </div>
  );
}
