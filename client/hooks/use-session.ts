"use client";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { auth } from "@/lib/firebase/firebase-config";
import createAxiosInstance from "@/hooks/axios/axios";
import { useAuthStore } from "@/hooks/use-auth-store";

const axios = createAxiosInstance(0);

async function fetchUser() {
  const response = await axios.get("/auth/me");
  return response.data;
}

export function useSession() {
  const { user, status, setUser, setStatus } = useAuthStore();

  const { data, error, isLoading, refetch } = useQuery("user", fetchUser, {
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await refetch();
        } catch (error) {
          console.error("Error during session check:", error);
          setUser(null);
          setStatus("unauthenticated");
        }
      } else {
        setUser(null);
        setStatus("unauthenticated");
      }
    });

    return () => unsubscribe();
  }, [setUser, setStatus, refetch]);

  useEffect(() => {
    if (isLoading) {
      setStatus("loading");
    } else if (error) {
      setUser(null);
      setStatus("unauthenticated");
    } else if (data) {
      setUser(data);
      setStatus("authenticated");
    }
  }, [data, error, isLoading, setUser, setStatus]);

  return { user, status };
}
