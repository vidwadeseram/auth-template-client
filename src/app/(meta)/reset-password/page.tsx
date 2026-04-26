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

function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const params = useSearchParams();
  const urlToken = params.get("token") || "";
  const [token, setToken] = useState(urlToken);
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try { await resetPassword(token, password); setDone(true); toast.success("Password reset successfully!"); }
    catch (err: unknown) { toast.error((err instanceof Error ? err.message : null) || "Reset failed"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center"><CardTitle className="text-2xl">New password</CardTitle><CardDescription>Enter your new password</CardDescription></CardHeader>
        <CardContent>
          {done ? (
            <div className="text-center space-y-4"><p className="text-muted-foreground">Password has been reset.</p><Link href="/login"><Button>Sign in</Button></Link></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!urlToken && (<div className="space-y-2"><Label htmlFor="token">Reset token</Label><Input id="token" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter token from email" required /></div>)}
              <div className="space-y-2"><Label htmlFor="password">New password</Label><Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} /></div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Resetting..." : "Reset password"}</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() { return <Suspense><ResetPasswordForm /></Suspense>; }
