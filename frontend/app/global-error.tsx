'use client';

import { useEffect } from 'react';
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-2">Application Error</h1>
            <p className="text-gray-700 mb-6">
              {error.message || 'The application encountered a critical error and could not continue.'}
            </p>
            <p className="text-sm text-gray-500 mb-8">
              This is a global error and affects the entire application.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}