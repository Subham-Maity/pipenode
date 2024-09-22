"use client";
import React from "react";
import { signInWithGoogle } from "@/lib/firebase/firebase-config";
import createAxiosInstance from "@/hooks/axios/axios";
import { useSession } from "@/hooks/use-session";
import Loader from "@/components/loader/default-loader";

const axios = createAxiosInstance(0);

interface SignInButtonProps {
  redirectTo: string;
  children: React.ReactNode;
}

const SignIn: React.FC<SignInButtonProps> = ({ redirectTo, children }) => {
  const { status } = useSession();

  if (status === "loading" || status === "authenticated") {
    return <Loader />;
  }
  const handleSignIn = async () => {
    try {
      const userCredentials = await signInWithGoogle();
      const idToken = await userCredentials.user.getIdToken();
      await axios.post("/auth/login", { idToken });
      window.location.href = redirectTo;
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return <button onClick={handleSignIn}>{children}</button>;
};

export default SignIn;
