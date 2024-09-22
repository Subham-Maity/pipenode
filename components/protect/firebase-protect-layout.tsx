"use client";
import React from "react";

import { useRouter } from "next/navigation";

import Loader from "@/components/loader/default-loader";
import { useSession } from "@/hooks/use-session";

interface FirebaseAuthProtectorProps {
  children: React.ReactNode;
}

export function FirebaseAuthProtector({
  children,
}: FirebaseAuthProtectorProps) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    router.push("/task/sign-in");
    return null;
  }

  return <>{children}</>;
}
