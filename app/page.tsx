import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex space-x-1 animate-pulse items-center">
      <ArrowLeftCircle className="w-12 h-12 text-gray-400" />
      <h1 className="text-lg font-sans font-bold text-gray-400">
        Get started with creating a New document
      </h1>
    </main>
  );
}
