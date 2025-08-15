// components/AuthCard.tsx (or Card.tsx)
import { ReactNode } from "react";

export default function CardWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">
      {children}
    </div>
  );
}

