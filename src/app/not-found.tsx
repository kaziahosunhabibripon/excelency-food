import React from "react";
import Link from "next/link";
import CommonHeader from "@/components/common/CommonHeader";

const NotFoundPage = () => {
  return (
    <section>
      <CommonHeader
        title="Oops!"
        subtitle="404"
        componentTitle="Page not found"
      />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center space-y-8 p-8 max-w-md w-full mx-4">
          <div className="animate-fade-in-up">
            <div className="text-9xl font-extrabold text-gray-800 mb-4">
              404
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Opps! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="cursor-pointer inline-block bg-brand text-white font-medium py-3 px-6 rounded-md transition duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
