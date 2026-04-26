"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function VerifyEmailForm() {
  const { verifyEmail } = useAuth();
  const params = useSearchParams();
  const [token, setToken] = useState(params.get("token") || "");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try { await verifyEmail(token); setDone(true); toast.success("Email verified!"); }
    catch (err: unknown) { toast.error((err instanceof Error ? err.message : null) || "Verification failed"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center"><CardTitle className="text-2xl">Verify email</CardTitle><CardDescription>Confirm your email address</CardDescription></CardHeader>
        <CardContent>
          {done ? (
            <div className="text-center space-y-4"><p className="text-muted-foreground">Your email has been verified.</p><Link href="/login"><Button>Sign in</Button></Link></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="token">Verification token</Label><Input id="token" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter token from email" required /></div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Verifying..." : "Verify email"}</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() { return <Suspense><VerifyEmailForm /></Suspense>; }
