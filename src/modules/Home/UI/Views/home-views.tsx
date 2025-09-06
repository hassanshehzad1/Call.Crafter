"use client";

import { Button } from "@/components/ui/button";
import { session } from "@/db/schema";
import { authClient } from "@/lib/auth-client";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  if (!session) {
    return (
      <div>
        <p className="text-muted-foreground ">Loading....</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col gap-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            })
          }
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default HomeView;
