"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AuthInitializer() {
  const { isSignedIn } = useUser();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (isSignedIn) {
      storeUser();
    }
  }, [isSignedIn]);

  return null;
}
