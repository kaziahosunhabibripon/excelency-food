"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "react-feather";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="container flex max-w-md flex-col items-center justify-center gap-6 px-4 py-16 text-center md:py-24">
        <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-6">
          <AlertTriangle
            className="h-12 w-12 text-red-500"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Critical Error
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-200">
          Application Crashed
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Sorry, the application has encountered a critical error. Our team has
          been notified.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload Application
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        {error.digest && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
};

export default GlobalError;
