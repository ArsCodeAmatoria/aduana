"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ApiPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/docs/api-documentation");
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-lg">Redirecting to API Documentation...</p>
      </div>
    </div>
  );
} 