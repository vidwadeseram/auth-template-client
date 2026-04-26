"use client";

import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.first_name || "User"}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Profile</CardTitle><CardDescription>Your account status</CardDescription></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Email</CardTitle><CardDescription>Verification status</CardDescription></CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${user?.email_verified ? "text-green-600" : "text-yellow-600"}`}>
              {user?.email_verified ? "Verified" : "Pending"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Member since</CardTitle><CardDescription>Account created</CardDescription></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
