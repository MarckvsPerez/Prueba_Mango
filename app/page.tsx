import { Metadata } from "next";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-64px)] mt-[64px] p-4 bg-gray-100">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Mango's technical test</h1>
        <p className="text-lg mb-8">
          This is my technical test for Mango. I'm Marc Pérez Salat.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/exercise1"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Exercise 1
          </Link>
          <Link
            href="/exercise2"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Exercise 2
          </Link>
        </div>
      </div>
    </main>
  );
}
