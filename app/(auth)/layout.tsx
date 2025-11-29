import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/");
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
