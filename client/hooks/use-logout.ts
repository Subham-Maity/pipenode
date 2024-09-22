"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import createAxiosInstance from "@/hooks/axios/axios";
import { auth } from "@/lib/firebase/firebase-config";
import { useAuthStore } from "@/hooks/use-auth-store";

const axios = createAxiosInstance(0);

export function useLogoutFirebase(redirectTo: string) {
  const router = useRouter();
  const { clear } = useAuthStore();
  return useCallback(async () => {
    try {
      // Call the backend logout endpoint
      await axios.post("/auth/logout");

      // Sign out from Firebase
      await auth.signOut();

      // Clear the local auth state
      clear();

      // Redirect to home page or login page
      router.push(redirectTo);
    } catch (error) {
      console.error("Logout error:", error);
      // Handle any logout errors here
    }
  }, [clear, router, redirectTo]);
}
