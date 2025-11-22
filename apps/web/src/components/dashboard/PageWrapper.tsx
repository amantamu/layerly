import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {children}
    </div>
  );
}

