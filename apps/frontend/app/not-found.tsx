import Link from 'next/link';
import React from 'react';

export default async function NotFoundRoot() {

    return (
        <div className="w-[95%] h-screen lg:w-auto mx-auto flex flex-col items-center py-10 lg:py-12 justify-center space-y-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-center">
                404
            </h1>
            <p className="text-lg lg:text-2xl text-center">
                Page not found
            </p>
            <Link href="/" className="text-lg lg:text-2xl text-center text-[#019C98] hover:underline">
                Go back to home
            </Link>
        </div>
    );
}

