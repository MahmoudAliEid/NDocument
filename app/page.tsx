import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex  items-center sm:max-w-3xl mx-auto justify-center animate-pulse ">
      {/* Icon with animation */}
      <ArrowLeftCircle className="w-16 h-16 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text animate-bounce" />
      <div className="flex flex-col items-center justify-center">
        <Image src="/NDocument.png" alt="logo" width={180} height={130} />

        {/* Title with gradient text */}
        <h1 className="mt-4 text-3xl md:text-2xl font-bold text-transparent animate-pulse bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text">
          Get Started with Creating a New Document
        </h1>

        {/* Subtext */}
        <p className="mt-2 text-gray-600 text-sm text-center">
          {`Start by clicking the "New Document" button and unleash your creativity!`}
        </p>
      </div>
    </main>
  );
}
