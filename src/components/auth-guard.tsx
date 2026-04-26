"use client";

import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, api } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (!loading && !user && !error && !isRetrying) {
      if (typeof window !== "undefined" && !navigator.onLine) {
        setError("Network error detected. Please check your connection.");
      } else {
        router.push("/login");
      }
    }
  }, [user, loading, router, error, isRetrying]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (loading) {
      timeoutId = setTimeout(() => {
        setError("Connection timeout. The server might be unreachable.");
      }, 10000);
    }
    return () => clearTimeout(timeoutId);
  }, [loading]);

  const handleRetry = async () => {
    setError(null);
    setIsRetrying(true);
    try {
      await api.auth.me();
      window.location.reload();
    } catch (err) {
      setError("Still unable to connect. Please try again later.");
      setIsRetrying(false);
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="text-center text-red-500">{error}</div>
        <button 
          onClick={handleRetry}
          disabled={isRetrying}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {isRetrying ? "Retrying..." : "Retry Connection"}
        </button>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return <>{children}</>;
}
