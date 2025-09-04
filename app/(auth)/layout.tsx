import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
