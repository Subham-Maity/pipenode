"use client";
import React from "react";
import { useLogoutFirebase } from "@/hooks/use-logout";

interface LogoutButtonProps {
  redirectTo: string;
  children: React.ReactNode;
}

const Logout: React.FC<LogoutButtonProps> = ({ redirectTo, children }) => {
  const logout = useLogoutFirebase(redirectTo);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <button onClick={handleLogout}>{children}</button>;
};

export default Logout;
