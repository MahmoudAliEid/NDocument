import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex items-center animate-pulse gap-3 p-4 bg-gradient-to-r from-primary via-primary-foreground to-slate-500 rounded-lg shadow-lg">
      <ArrowLeftCircle className="w-14 h-14 text-primary animate-bounce" />
      <h1 className="text-2xl font-sans font-bold text-primary ">
        Get started with creating a new document
      </h1>
    </main>
  );
}
