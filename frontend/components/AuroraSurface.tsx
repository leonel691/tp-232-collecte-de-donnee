import React from "react";

export default function AuroraSurface({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative flex min-h-full flex-1 flex-col overflow-hidden ${className}`}>
      <div className="absolute inset-0 mc-aurora" />
      <div className="pointer-events-none absolute inset-0 mc-noise" />
      <div className="relative flex min-h-full flex-1 flex-col">{children}</div>
    </div>
  );
}

