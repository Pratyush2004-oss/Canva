import { SignIn, UserButton, useUser } from "@stackframe/stack";
import Link from "next/link";
import React from "react";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Canva Clone</h1>
        <p className="text-lg text-gray-600">
          Design stunning graphics easily. Start your creative journey now!
        </p>
      </header>
      <div className="mb-8">
        <UserButton />
      </div>
      {

      }
      <Link
        href="/workspace"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
      >
        Start Designing
      </Link>
    </div>
  );
}

export default LandingPage;