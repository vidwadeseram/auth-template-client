"use client";

import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <Card>
        <CardHeader><CardTitle>Personal Information</CardTitle><CardDescription>Your account details</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-muted-foreground">First Name</p><p className="font-medium">{user?.first_name}</p></div>
            <div><p className="text-sm text-muted-foreground">Last Name</p><p className="font-medium">{user?.last_name}</p></div>
            <div><p className="text-sm text-muted-foreground">Email</p>
              <div className="flex items-center gap-2"><p className="font-medium">{user?.email}</p>
                <Badge variant={user?.email_verified ? "default" : "secondary"}>{user?.email_verified ? "Verified" : "Unverified"}</Badge>
              </div>
            </div>
            <div><p className="text-sm text-muted-foreground">Role</p><p className="font-medium">{user?.role || "user"}</p></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
